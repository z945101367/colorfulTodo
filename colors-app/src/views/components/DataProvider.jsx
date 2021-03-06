import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useReducer,
} from 'react'
import { getTodoList } from 'model/mine'
const DataContext = createContext({})
const NEXT = 'NEXT'
const PRE = 'PRE'
const defaultIndex = 0 //初始index
const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT':
      return action.index
    case 'PRE':
      return action.index
    default:
      break
  }
}
const Data = ({ children }) => {
  const [toDoList, setToDoList] = useState([])
  const [currentIndex, dispatch] = useReducer(reducer, defaultIndex)
  const todoListCallback = useCallback(() => {
    const doThingList = async () => {
      try {
        const res = await getTodoList()
        setToDoList(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    return doThingList()
  }, [])

  useEffect(() => {
    todoListCallback()
  }, [todoListCallback])
  return (
    <DataContext.Provider value={{ toDoList, currentIndex, dispatch }}>
      {children}
    </DataContext.Provider>
  )
}

export { NEXT, PRE, DataContext, Data }
