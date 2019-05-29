import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePlayer } from '../../../../redux/saga/sagas';
import { useRouter } from '../../../providers/router/RouterProvider';
import selectors from '../../../../redux/selectors';

function SetupName(props) {
  const dispatch = useDispatch()
  const key = useSelector(selectors.getUserKey)
  const name = useSelector(selectors.getUserName)
  const [input, setInput] = React.useState(name)
  const { history } = useRouter()

  return (
    <>
      <div>Change your name?</div>
      <Input
        onChange={(e, data) => setInput(data.value)}
        value={input}
      />
      <Button onClick={() => {
        dispatch(updatePlayer.trigger({ key, name: input }))
        history.push('/lobby')
      }}>Submit</Button>
    </>
  )
}
export default SetupName;