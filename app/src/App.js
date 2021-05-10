import React, { useState } from 'react'
import { useAragonApi } from '@aragon/api-react'
import {
  Box, Button, GU, Header, IconMinus, IconPlus,
  Main, SyncIndicator, Tabs, Text, textStyle,
  TextInput,Card, DropDown,
  Field,Table, TableHeader, TableRow, TableCell,
} from '@aragon/ui'
import styled from 'styled-components'

function App() {
  const { api, appState, path, requestPath } = useAragonApi()
  const { numTasks, tasks, priorities, isDone,  isSyncing} = appState

  const pathParts = path.match(/^\/tab\/([0-9]+)/)
  const pageIndex = Array.isArray(pathParts)
    ? parseInt(pathParts[1], 10) - 1
    : 0
    
  
  const [newName, setNewName] = useState('')
  const [nameToDel, setnameToDel] = useState('')
  const [nameEdit, setnameEdit] = useState('')
  const [pEdit, setpEdit] = useState(-1)
  const [nameEnd, setnameEnd] = useState('')
  const [newTaskPrio, setNewTaskPrio] = useState(-1)
  return (
    <Main>
      {isSyncing && <SyncIndicator />}
      <Header
        GHprimary="P2P Models:"
        secondary={
          <span
            css={`
              ${textStyle('title2')}
            `}
          >
            Total tasks: {numTasks}
          </span>
        }
      />
    
      <Box>
      <div 
        css={`
          display:flex;
          flex-direction:row;
          justify-content:space-between;
        `}>
        <div  
          css={`
            width:45%;
          `}>
          <Field label="Task name">
              <TextInput
                wide
                value={newName}
                onChange={event => {setNewName(event.target.value)}}
              />
            </Field>
            <DropDown 
                placeholder="Select a priority"
                wide
                items={['HIGH', 'MEDIUM', 'LOW']}
                selected={newTaskPrio}
                onChange={setNewTaskPrio}
            />
            <Button
              label="Create task"
              onClick={() => api.createTask(newName, newTaskPrio).toPromise()}
              css={`
                margin-top:7%;
                background-color: lightblue;
                margin-left: ${2 * GU}px;
              `}
            />
        </div>
        <div
          css={`
            width:45%;
          `}>
          <DropDown 
              placeholder="Select a task"
              wide
              items={tasks}
              selected={nameEdit}
              onChange={setnameEdit}
              css={`
                margin-top:7%;
                margin-bottom:8%;
              `}
          />
          <DropDown placeholder="Select a new priority"
                wide
                items={["HIGH", "MEDIUM", "LOW"]}
                selected={pEdit}
                onChange={setpEdit}
            />
          
          <Button
            label="Modify priority"
            onClick={() => api.changePriority(tasks[nameEdit], pEdit).toPromise()}
            css={`
              margin-top: 7%;
              background-color: wheat;
              margin-left: ${2 * GU}px;
            `}
          />
        </div>
        
      </div>

      

      <Table 
        css={`
            margin-top: 4%;
            width:100%;
        `}
        header={
          <TableRow>
            <TableHeader css={`font-size:24px};`} title="Task name" />
            <TableHeader css={`font-size:24px};`} title="Priority" />
            <TableHeader css={`font-size:24px};`} title="Status" />
          </TableRow>
        }
      >
    {renderTable(tasks, priorities, isDone)}
      </Table>
        
      <div 
        css={`
          display:flex;
          flex-direction:row;
          justify-content:space-between;
          margin-top: 5%;
        `}>
        <div
          css={`
            width:45%;
          `}>
          <DropDown 
              placeholder="Select a task"
              wide
              items={tasks}
              selected={nameEnd}
              onChange={setnameEnd}
          />
          <Button
            label="End task"
            onClick={() => api.endTask(tasks[nameEnd]).toPromise()}
            css={`
              margin-top:7%;
              background-color: silver;
              margin-left: ${2 * GU}px;
            `}
          />
        </div>
        <div
          css={`
            width:45%;
          `}>
          <DropDown 
              placeholder="Select a task"
              wide
              items={tasks}
              selected={nameToDel}
              onChange={setnameToDel}
          />
          <Button
            label="Delete task"
            onClick={() => api.deleteTask(tasks[nameToDel]).toPromise()}
            css={`
              margin-top:7%;
              background-color: lightcoral;
              margin-left: ${2 * GU}px;
            `}
          />
        </div>
      </div>
      </Box>
    </Main>
  )
}

function renderTable(tasks, priorities, isDone) {
  const zipped = tasks.map((t,i) => [t, priorities[i],isDone[i] ]);
  return zipped.map((task) => {
    const [name, prio, done] = task
    return (<TableRow>
      <TableCell>
        <Text css={`${textStyle('body2')};`}>{name}</Text>
      </TableCell>
      <TableCell>
        <Text css={`${textStyle('body2')};`}>{prio}</Text>
      </TableCell>
      <TableCell>
        <Text css={`${textStyle('body2')};`}>{done}</Text>
      </TableCell>
    </TableRow>
    )
  })
}
const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 40px;
  margin-top: 20px;
`

export default App
