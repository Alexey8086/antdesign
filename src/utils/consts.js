import { Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"

export const columns = [ 
    { 
        key: "name", 
        title: "Название", 
        dataIndex: "name", 
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
            return (
                <Input
                    autoFocus
                    placeholder="Введите что-нибудь ..."
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                        confirm({closeDropDown: false})
                    }}
                    onPressEnter={ () => confirm()}
                    onBlur={ () => confirm() }
                    >

                </Input>
            )
        },
        filterIcon: () => {
            return <SearchOutlined />
        },
        onFilter: (value, record) => {
            return record.name.toLowerCase().includes(value.toLowerCase())
        }
    },
    { 
        key: "brand", 
        title: "Производитель", 
        dataIndex: "name", 
    },
    { 
        key: "revenue", 
        title: "Доходы",
        dataIndex: "revenue", 
    },
    { 
        key: "revenue_period", 
        title: "Доходы за период",
        dataIndex: "revenue_period",
    },
    {
        key: "price",
        title: "Цена",
        dataIndex: "price",
    },
    {
        key: "seller",
        title: "продавец",
        dataIndex: "seller"
    },
    { 
        key: "stocks", 
        title: "Продажи за всё время",
        dataIndex: "stocks"
    }
]

