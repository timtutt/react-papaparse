import React, { CSSProperties } from 'react'
import PapaParse from 'papaparse'
import getSize from './util'

const GREY = '#ccc'

const styles = {
  dropArea: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: GREY,
    borderRadius: 20,
    height: '100%',
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  } as CSSProperties,
  inputFile: {
    display: 'none'
  } as CSSProperties,
  highlight: {
    borderColor: 'purple'
  } as CSSProperties,
  unhighlight: {
    borderColor: GREY
  } as CSSProperties,
  dropFile: {
    borderRadius: 20,
    background: 'linear-gradient(to bottom, #eee, #ddd)',
    width: 100,
    height: 120,
    position: 'relative',
    display: 'block',
    zIndex: 10,
    paddingLeft: 10,
    paddingRight: 10
  } as CSSProperties,
  column: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  } as CSSProperties,
  progressBar: {
    width: '80%',
    borderRadius: 3,
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, .2)',
    position: 'absolute',
    bottom: 14
  } as CSSProperties,
  progressBarFill: {
    height: 10,
    backgroundColor: '#659cef',
    borderRadius: 3,
    transition: 'width 500ms ease-in-out'
  } as CSSProperties,
  fileSizeInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: '0 0.4em',
    borderRadius: 3,
    lineHeight: 1,
    marginBottom: '0.5em'
  } as CSSProperties,
  fileNameInfo: {
    fontSize: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: '0 0.4em',
    borderRadius: 3,
    lineHeight: 1
  } as CSSProperties,
  defaultCursor: {
    cursor: 'default'
  } as CSSProperties,
  pointerCursor: {
    cursor: 'pointer'
  } as CSSProperties
}

interface Props {
  children?: any,
  onDrop: (data: any) => void
  onFileLoad: (data: any) => void
  onError: () => void
  config: any,
  style: any,
  noClick: boolean
  noDrag: boolean
  progressBarColor: string
}

interface State {
  dropAreaStyle: any
  hasFiles: boolean
  progressBar: number
  displayProgressBarStatus: string
  file: string
  timeout: any
}

export default class CSVReaderRewrite extends React.Component<Props, State> {
  inputFileRef: any = React.createRef()
  dropAreaRef: any = React.createRef()
  fileSizeInfoRef: any = React.createRef()
  fileNameInfoRef: any = React.createRef()
  progressBarFillRef: any = React.createRef()

  state = {
    dropAreaStyle: styles.dropArea,
    hasFiles: false,
    progressBar: 0,
    displayProgressBarStatus: 'none',
    file: '',
    timeout: null,
  } as State

  componentDidMount = () => {
    const currentDropAreaRef: any = this.dropAreaRef.current

    const fourDragsEvent = ['dragenter', 'dragover', 'dragleave', 'drop']
    fourDragsEvent.forEach(item => {
      currentDropAreaRef.addEventListener(item, this.preventDefaults, false)
    })

    if (!this.props.noDrag) {
      const highlightDragsEvent = ['dragenter', 'dragover']
      highlightDragsEvent.forEach(item => {
        currentDropAreaRef.addEventListener(item, this.highlight, false)
      })
      currentDropAreaRef.addEventListener('dragleave', this.unhighlight, false)
      currentDropAreaRef.addEventListener('drop', this.unhighlight, false)
      currentDropAreaRef.addEventListener('drop', this.visibleProgressBar, false)
      currentDropAreaRef.addEventListener('drop', this.handleDrop, false)
    }
  }

  preventDefaults = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
  }

  highlight = () => {
    this.setState({ dropAreaStyle: Object.assign({}, styles.dropArea, styles.highlight) })
    this.initializeProgress()
  }

  unhighlight = () => {
    this.setState({ dropAreaStyle: Object.assign({}, styles.dropArea, styles.unhighlight) })
  }

  visibleProgressBar = () => {
    this.setState({ displayProgressBarStatus: 'block' })
  }

  handleDrop = (e: any) => {
    let files = {}
    if (e.files === undefined) {
      const dt = e.dataTransfer
      files = dt.files
    } else {
      files = e.files
    }
    this.setState({ hasFiles: true }, () => { this.handleFiles(files) })
  }

  initializeProgress = () => {
    this.setState({ progressBar: 0 })
  }

  handleFiles = (files: any) => {
    this.setState({ progressBar: 0 })
    files = [...files]
    files.forEach(this.uploadFile)
  }

  uploadFile = (file: any, index: number) => {
    this.displayFileInfo(file)
    this.setState({ file })

    const {
      onDrop,
      onFileLoad,
      onError,
      config = {}
    } = this.props

    const reader = new window.FileReader()

    let options = {}

    if (config.error) {
      delete config.error
    }

    if (config.step) {
      delete config.step
    }

    if (config.complete) {
      delete config.complete
    }

    const size = file.size
    const data: any = []
    let percent = 0

    if (onDrop || onFileLoad) {
      const self = this
      options = Object.assign({
        complete: () => {
          if (!onDrop) {
            onFileLoad(data)
          } else {
            onDrop(data)
          }
        },
        step: (row: any, parser: any) => {
          data.push(row)
          const progress = row.meta.cursor
          const newPercent = Math.round(progress / size * 100)
          if (newPercent === percent) return
          percent = newPercent
          self.updateProgress(percent)
        }
      }, options)
    }

    if (onError) {
      options = Object.assign({ error: onError }, options)
    }

    if (config) {
      options = Object.assign(config, options)
    }

    reader.onload = (e: any) => {
      PapaParse.parse(e.target.result, options)
    }

    reader.onloadend = () => {
      clearTimeout(this.state.timeout)
      this.setState({ timeout: setTimeout(() => { this.disableProgressBar() }, 2000) })
    }

    reader.readAsText(file, config.encoding || 'utf-8')
  }

  displayFileInfo = (file: any) => {
    if (!this.childrenIsFunction()) {
      this.fileSizeInfoRef.current.innerHTML = getSize(file.size)
      this.fileNameInfoRef.current.innerHTML = file.name
    }
  }

  updateProgress = (percent: number) => {
    this.setState({ progressBar: percent })
  }

  disableProgressBar = () => {
    this.setState({ displayProgressBarStatus: 'none' })
  }

  childrenIsFunction = () => {
    return typeof this.props.children === 'function'
  }

  handleInputFileChange = (e: any) => {
    const { target } = e
    this.setState({ displayProgressBarStatus: 'block' }, () => { this.handleDrop(target) })
  }

  open = (e: any) => {
    if (e) {
      e.stopPropagation()
      this.inputFileRef.current.click()
    }
  }

  renderChildren = () => {
    return this.childrenIsFunction()
      ? this.props.children({ file: this.state.file })
      : this.props.children
  }

  render() {
    const {
      style,
      noClick,
      children,
      progressBarColor
    } = this.props

    return (
      <>
        <input
          type='file'
          accept='text/csv'
          ref={this.inputFileRef}
          style={styles.inputFile}
          onChange={e => this.handleInputFileChange(e)}
        />
        {
          !this.childrenIsFunction() ? (
            <div
              ref={this.dropAreaRef}
              style={Object.assign({}, style, this.state.dropAreaStyle, noClick ? styles.defaultCursor : styles.pointerCursor)}
              onClick={noClick ? () => {} : this.open}
            >
              {
                this.state.hasFiles ? (
                  <div style={Object.assign({}, styles.dropFile, styles.column)}>
                    <div style={styles.column}>
                      <span style={styles.fileSizeInfo} ref={this.fileSizeInfoRef} />
                      <span style={styles.fileNameInfo} ref={this.fileNameInfoRef} />
                    </div>
                    <div style={styles.progressBar}>
                      <span
                        style={
                          Object.assign(
                            {},
                            styles.progressBarFill,
                            {
                              width: `${this.state.progressBar}%`,
                              display: this.state.displayProgressBarStatus
                            })
                        }
                        ref={this.progressBarFillRef}
                      />
                    </div>
                  </div>
                ) : (
                  children
                )
              }
            </div>
          ) : (
            <div ref={this.dropAreaRef}>
              {this.renderChildren()}
              <div style={Object.assign({}, styles.progressBar, { position: 'inherit', width: '100%' })}>
                <span
                  style={
                    Object.assign(
                      {},
                      styles.progressBarFill,
                      { backgroundColor: progressBarColor || '#659cef' },
                      {
                        width: `${this.state.progressBar}%`,
                        display: this.state.displayProgressBarStatus
                      })
                  }
                  ref={this.progressBarFillRef}
                />
              </div>
            </div>
          )
        }
      </>
    )
  }
}
