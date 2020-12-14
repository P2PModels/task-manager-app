import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Aragon, { events } from '@aragon/api'
import { getPrototypeOf } from '@aragon/ui/dist/getPrototypeOf-55c9e80c'

const app = new Aragon()
//prueba
app.store(
  async (state, { event }) => {
    const nextState = {
      ...state,
    }
  
    try {
      switch (event) {
        case 'CreateTask':
          return { ...nextState, numTasks: await getValue(), tasks: await getNames(), priorities: await getP(), isDone: await getisDone()}
        case 'DeleteTask':
          return { ...nextState, numTasks: await getValue(), tasks: await getNames(), priorities: await getP(), isDone: await getisDone()}
        case 'ChangePriority':
          return { ...nextState, numTasks: await getValue(), tasks: await getNames(), priorities: await getP(), isDone: await getisDone()}
        case 'EndTask':
          return { ...nextState, numTasks: await getValue(), tasks: await getNames(), priorities: await getP(), isDone: await getisDone()}
        case events.SYNC_STATUS_SYNCING:
          return { ...nextState, isSyncing: true }
        case events.SYNC_STATUS_SYNCED:
          return { ...nextState, isSyncing: false }
        default:
          return state
      }
    } catch (err) {
      console.log(err)
    }
  },
  {
    init: initializeState(),
  }
)

/***********************
 *                     *
 *   Event Handlers    *
 *                     *
 ***********************/

function initializeState() {
  return async cachedState => {
    return {
      ...cachedState,
      numTasks: await getValue(),
      tasks: await getNames(),
      priorities: await getP(),
      isDone: await getisDone()
    }
  }
}

 
async function getValue() {
  return parseInt(await app.call('numTasks').toPromise(), 10)
}

async function getTasks(id) {
  return await app.call('tasks', id).toPromise()
}

async function getNames() {
  let names = [];
  for(let i = 0; i < await getValue(); i++) {
    let n = await getTasks(i);
    names[i] = n[0];
  }
  return names;
}
async function getP() {
  let names = [];
  for(let i = 0; i < await getValue(); i++) {
    let n = await getTasks(i);
    names[i] = n[1];
  }
  return names;
}
async function getisDone() {
  let names = [];
  for(let i = 0; i < await getValue(); i++) {
    let n = await getTasks(i);
    if(n[2]){
      names[i] = "Done";
    }
    else {
      names[i] = "In progress";
    }
  }
  return names;
}




