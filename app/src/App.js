import React, { useState } from 'react'
import { useAragonApi } from '@aragon/api-react'
import {
  Box, Button, GU, Header, IconMinus, IconPlus,
  Main, SyncIndicator, Tabs, Text, textStyle,
  TextInput,Card,
  Field,Table, TableHeader, TableRow, TableCell,
} from '@aragon/ui'
import styled from 'styled-components'

function App() {
  const { api, appState, path, requestPath } = useAragonApi()
  const { numTasks, tasks, priorities, isSyncing} = appState

  const pathParts = path.match(/^\/tab\/([0-9]+)/)
  const pageIndex = Array.isArray(pathParts)
    ? parseInt(pathParts[1], 10) - 1
    : 0
    
  const [newp, setNewP] = useState('')
  const [newName, setNewName] = useState('')
  const [nameToDel, setnameToDel] = useState('')
  const [nameEdit, setnameEdit] = useState('')
  const [pEdit, setpEdit] = useState('')
  const [nameEnd, setnameEnd] = useState('')
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
            <Field label="Priority (HIGH, MEDIUM, LOW)">
                <TextInput
                  wide
                  value={newp}
                  onChange={event => {setNewP(event.target.value)}}
                />
            </Field> 
            <Button
              label="Create task"
              onClick={() => api.createTask(1, newName, newp).toPromise()}
              css={`
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
          <Field label="New priority (HIGH, MEDIUM, LOW)">
              <TextInput
                wide
                value={pEdit}
                onChange={event => {setpEdit(event.target.value)}}
              />
          </Field> 
          
          <Button
            label="Modify priority"
            onClick={() => api.changePriority(nameEdit, pEdit).toPromise()}
            css={`
              background-color: wheat;
              margin-left: ${2 * GU}px;
            `}
          />
        </div>
        
      </div>

     
        
      <Table 
        css={`
          margin-top: 5%;
            width:100%;
        `}
        header={
          <TableRow>
            <TableHeader css={`font-size:24px};`} title="Remaining tasks" />
            <TableHeader css={`font-size:24px};`} title={numTasks} />
          </TableRow>
        }
      >
        <TableRow>
          <TableCell>
            <Text css={`${textStyle('body2')};`}>Task name</Text>
          </TableCell>
          <TableCell>
            <Text css={`${textStyle('body2')};`}>Priority</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text css={`${textStyle('body3')};`}>{tasks[0]}</Text>
          </TableCell>
          <TableCell>
            <Text css={`${textStyle('body3')};`}>{priorities[0]}</Text>
          </TableCell>
          
        </TableRow>
        <TableRow>
          <TableCell>
            <Text css={`${textStyle('body3')};`}>{tasks[1]}</Text>
          </TableCell>
          <TableCell>
            <Text css={`${textStyle('body3')};`}>{priorities[1]}</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text css={`${textStyle('body3')};`}>{tasks[2]}</Text>
          </TableCell>
          <TableCell>
            <Text css={`${textStyle('body3')};`}>{priorities[2]}</Text>
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
