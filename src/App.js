import React, {useEffect, useState, useRef, useCallback} from "react"
import "./App.css"
import { Table } from "antd"
import "antd/dist/antd.css"
import {getData} from './utils/getData'
import {columns} from './utils/consts'
import ReactDragListView from 'react-drag-listview'

const App = () => { 

const [dataSourse, setDataSourse] = useState([])
const [pageSize, setPageSize] = useState(0)
const [currentPage, setCurrentPage] = useState(0)
const [offset, setOffest] = useState(0)
const [limit, setLimit] = useState(0)
const offsetStep = 100

function fetchData (offset, offsetIsChanged) {

    getData(100, offset).then(({data}) => {
      const arr = data.data.map((item) => {
        return {
          name: item.name,
          brand: item.brand.name,
          revenue: item.revenue,
          revenue_period: item.revenue_period,
          price: item.price,
          seller: item.seller.name,
          stocks: item.stocks
        }
      })
      const alldata = arr.concat(dataSourse)

      setDataSourse(alldata)
      if (offsetIsChanged) setOffest(offset)

    }).catch((err) => {
      console.log(err)
    })

}

const myRef = useRef()
useEffect(() => {
  console.log('MY REF ----- ', myRef.current)
  fetchData(offset)
}, [])




const showTotalHandler = useCallback((total) => {
  const amount = Math.round(total / pageSize)
  if (isFinite(amount)) {
    if (currentPage === amount - 1 || currentPage === amount) {
      console.log(currentPage, amount)
      const newOffset = offset + 100
      fetchData(newOffset, true)
    }
  }
}, [pageSize, currentPage])




const onChangeHandler = useCallback((page, pageSize) => {

  setPageSize(pageSize)
  setCurrentPage(page)

}, []) 






return ( 

    <div className="app"> 
      <div className="table-container">
        <ReactDragListView>
          <Table
            ref={myRef}
            columns={columns}
            dataSource={dataSourse}
            pagination={{
              pageSize: 15,
              showTotal: (total) => showTotalHandler(total),
              onChange: (page, pageSize) => onChangeHandler(page, pageSize)
              
            }}
            bordered
          />
        </ ReactDragListView >



      </div>
    </div> 


)
} 

export default App