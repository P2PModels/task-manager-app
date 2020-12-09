import React, { useState } from 'react'
import { useAragonApi } from '@aragon/api-react'
import {
  Box,
  Button,
  GU,
  Header,
  IconMinus,
  IconPlus,
  Main,
  SyncIndicator,
  Tabs,
  Text,
  textStyle,
  TextInput,
} from '@aragon/ui'
import styled from 'styled-components'

function App() {
  const { api, appState, path, requestPath } = useAragonApi()
  const { numTasks, isSyncing} = appState

  const pathParts = path.match(/^\/tab\/([0-9]+)/)
  const pageIndex = Array.isArray(pathParts)
    ? parseInt(pathParts[1], 10) - 1
    : 0
  //const [name, setname] = useState('')
  //const [priority, setpriority] = useState('')
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
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: ${50 * GU}px;
          ${textStyle('title3')};
        `}
      >
        Tareas: {numTasks}
        
        
        <Buttons>
          <Button            
            display="icon"
            icon={<IconMinus />}
            label="Decrement"
            onClick={() => api.deleteTask(1, "nombre").toPromise()}
          
          />
         
          <Button
            display="icon"
            icon={<IconPlus />}
            label="Create task"
            onClick={() => api.createTask(1, "nombre", "LOW").toPromise()}
            css={`
              margin-left: ${2 * GU}px;
            `}
          />
        </Buttons>
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
