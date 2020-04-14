// import React from 'react'

// import Welcome from '../src/components/screens/indexes/Welcome'
// import Navbar from '../src/components/screens/indexes/Navbar'
// import Feature from '../src/components/screens/indexes/Feature'
// import Framework from '../src/components/screens/indexes/Framework'
// import Love from '../src/components/screens/indexes/Love'
// import CSVParsing from '../src/components/screens/indexes/CSVParsing'
// import Delimiter from '../src/components/screens/indexes/Delimiter'
// import LocalFile from '../src/components/screens/indexes/LocalFile'
// import RemoteFile from '../src/components/screens/indexes/RemoteFile'
// import Stream from '../src/components/screens/indexes/Stream'
// import Worker from '../src/components/screens/indexes/Worker'
// import Header from '../src/components/screens/indexes/Header'
// import TypeConversion from '../src/components/screens/indexes/TypeConversion'
// import Comment from '../src/components/screens/indexes/Comment'
// import Error from '../src/components/screens/indexes/Error'
// import Unparse from '../src/components/screens/indexes/Unparse'
// import Download from '../src/components/screens/indexes/Download'

// const Index = () => {
//   return (
//     <>
//       <Welcome />
//       <main>
//         <Navbar />
//         <Feature />
//         <Framework />
//         <Love />
//         <CSVParsing />
//         <Delimiter />
//         <LocalFile />
//         <RemoteFile />
//         <Stream />
//         <Worker />
//         <Header />
//         <TypeConversion />
//         <Comment />
//         <Error />
//         <Unparse />
//         <Download />
//       </main>
//     </>
//   )
// }

// export default Index

// ======================================================

// ======================================================

// import React from 'react'
// import { readString } from 'react-papaparse'

// interface Props {
  
// }

// interface State {
  
// }

// export default class CSVReader extends React.Component<Props, State> {
//   handleClick = () => {
//     const str = `Column 1,Column 2,Column 3,Column 4
// 1-1,1-2,1-3,1-4
// 2-1,2-2,2-3,2-4
// 3-1,3-2,3-3,3-4
// 4,5,6,7`

//     const results = readString(str)

//     console.log('---------------------------')
//     console.log(results)
//     console.log('---------------------------')
//   }

//   render() {
//     return (
//       <button onClick={this.handleClick}>readString</button>
//     )
//   }
// }

// ======================================================

// import React from 'react'
// import { jsonToCSV } from 'react-papaparse'

// interface Props {
  
// }

// interface State {
  
// }

// export default class CSVReader extends React.Component<Props, State> {
//   handleClick = () => {
//     const jsonData = `[
//   {
//     "Column 1": "1-1",
//     "Column 2": "1-2",
//     "Column 3": "1-3",
//     "Column 4": "1-4"
//   },
//   {
//     "Column 1": "2-1",
//     "Column 2": "2-2",
//     "Column 3": "2-3",
//     "Column 4": "2-4"
//   },
//   {
//     "Column 1": "3-1",
//     "Column 2": "3-2",
//     "Column 3": "3-3",
//     "Column 4": "3-4"
//   },
//   {
//     "Column 1": 4,
//     "Column 2": 5,
//     "Column 3": 6,
//     "Column 4": 7
//   }
// ]`

//     const results = jsonToCSV(jsonData)

//     console.log('---------------------------')
//     console.log(results)
//     console.log('---------------------------')
//   }

//   render() {
//     return (
//       <button onClick={this.handleClick}>jsonToCSV</button>
//     )
//   }
// }

// ======================================================

// import React from 'react'
// import { readRemoteFile } from 'react-papaparse'

// interface Props {
  
// }

// interface State {
  
// }

// export default class Index extends React.Component<Props, State> {
//   handleClick = () => {
//     readRemoteFile('https://react-papaparse.js.org/static/csv/normal.csv', {
//       complete: (results) => {
//         console.log('Results:', results)
//       }
//     })
//   }

//   render() {
//     return (
//       <button onClick={this.handleClick}>readRemoteFile</button>
//     )
//   }
// }

// ======================================================

import React from 'react'
import { CSVReader } from 'react-papaparse'

interface Props {
  
}

interface State {
  
}

export default class Index extends React.Component<Props, State> {
  render() {
    return (
      <>
        <CSVReader>
          <span>Hi</span>
        </CSVReader>
      </>
    )
  }
}

// ======================================================
