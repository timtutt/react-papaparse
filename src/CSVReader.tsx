import React, { CSSProperties } from 'react'
import PapaParse from 'papaparse'
import getSize from './util'

const GREY = '#ccc'
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)'
const RED = '#A01919'
const RED_LIGHT = '#DD2222'

const styles = {
  dropArea: {
    alignItems: 'center',
    borderColor: GREY,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20
  } as CSSProperties,
  inputFile: {
    display: 'none'
  },
  highlight: {
    borderColor: 'purple'
  } as CSSProperties,
  unhighlight: {
    borderColor: GREY
  } as CSSProperties,
  dropFile: {
    background: 'linear-gradient(to bottom, #eee, #ddd)',
    borderRadius: 20,
    display: 'block',
    height: 120,
    width: 100,
    paddingLeft: 10,
    paddingRight: 10,
    position: 'relative',
    zIndex: 10
  } as CSSProperties,
  column: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  } as CSSProperties,
  fileSizeInfo: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    lineHeight: 1,
    marginBottom: '0.5em',
    padding: '0 0.4em'
  } as CSSProperties,
  fileNameInfo: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 14,
    lineHeight: 1,
    padding: '0 0.4em'
  } as CSSProperties,
  defaultCursor: {
    cursor: 'default'
  } as CSSProperties,
  pointerCursor: {
    cursor: 'pointer'
  } as CSSProperties,
  dropFileRemoveButton: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23
  } as CSSProperties
}

interface Props {
  
}

interface State {
}

export default class CSVReaderRewrite extends React.Component<Props, State> {

  render() {
    return (
      <>
        
      </>
    )
  }
}
