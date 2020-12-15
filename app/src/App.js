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
  const [selected, setSelected] = useState(-1)
  return (
    <Main>
      {isSyncing && <SyncIndicator />}
      <Header
        primary="Proyect:"
        secondary={
          <span
            css={`
              ${textStyle('title2')}
            `}
          >
            P2P Models
          </span>
        }
      />
      <Tabs
        items={['Tab 1', 'Tab 2']}
        selected={pageIndex}
        onChange={index => requestPath(`/tab/${index + 1}`)}
      />
      <Box
        css={`
          align-items: center;
          justify-content: center;
          text-align: center;
          height: ${150 * GU}px;
          ${textStyle('title3')};
        `}
      >
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
                items={["HIGH", "MEDIUM", "LOW"]}
                selected={selected}
                onChange={setSelected}
            />
            <Button
              label="Create task"
              onClick={() => api.createTask(1, newName, selected).toPromise()}
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
          <Field label="Task name to modify">
            <TextInput
              wide
              value={nameEdit}
              onChange={event => {setnameEdit(event.target.value)}}
            />
          </Field>
          <DropDown placeholder="Select a new priority"
                wide
                items={["HIGH", "MEDIUM", "LOW"]}
                selected={pEdit}
                onChange={setpEdit}
            />
          
          <Button
            label="Modify priority"
            onClick={() => api.changePriority(nameEdit, pEdit).toPromise()}
            css={`
              margin-top: 7%;
              background-color: wheat;
              margin-left: ${2 * GU}px;
            `}
          />
        </div>
        
      </div>

      <Text css={`
          margin:5%;
          float: right;
          color:#585C5C;
          font-size:15pt;
        `}>TASKS: {numTasks}</Text>
      

      <Table 
        css={`
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
       
        <TableRow>
          <TableCell>
            <Text css={`${textStyle('body2')};`}>{tasks[0]}</Text>
          </TableCell>
          <TableCell>
            <Text css={`${textStyle('body2')};`}>{priorities[0]}</Text>
          </TableCell>
          <TableCell>
            <Text css={`${textStyle('body2')};`}>{isDone[0]}</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text css={`${textStyle('body2')};`}>{tasks[1]}</Text>
          </TableCell>
          <TableCell>
            <Text css={`${textStyle('body2')};`}>{priorities[1]}</Text>
          </TableCell>
          <TableCell>
            <Text css={`${textStyle('body2')};`}>{isDone[1]}</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text css={`${textStyle('body2')};`}>{tasks[2]}</Text>
          </TableCell>
          <TableCell>
            <Text css={`${textStyle('body2')};`}>{priorities[2]}</Text>
          </TableCell>
          <TableCell>
            <Text css={`${textStyle('body2')};`}>{isDone[2]}</Text>
          </TableCell>
        </TableRow>
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
          <Field label="Task name to end">
            <TextInput
              wide
              value={nameEnd}
              onChange={event => {setnameEnd(event.target.value)}}
            />
          </Field>
          <Button
            label="End task"
            onClick={() => api.endTask(nameEnd).toPromise()}
            css={`
              background-color: silver;
              margin-left: ${2 * GU}px;
            `}
          />
        </div>
        <div
          css={`
            width:45%;
          `}>
          <Field label="Task name to delete">
            <TextInput
              wide
              value={nameToDel}
              onChange={event => {setnameToDel(event.target.value)}}
            />
          </Field>
          <Button
            label="Delete task"
            onClick={() => api.deleteTask(1, nameToDel).toPromise()}
            css={`
              background-color: lightcoral;
            `}
          />
        </div>
      </div>
      </Box>
    </Main>
  )
}

const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 40px;
  margin-top: 20px;
`

export default App
