import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current == null) return;

    const taskName = taskNameInput.current.value.trim();
    if (!taskName) {
      alert('digite o nome da tarefa');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handleInterruptTask(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();

    dispatch({
      type: TaskActionTypes.INTERRUPT_TASK,
    });
  }

  return (
    <form className='form' action='' onSubmit={handleCreateNewTask}>
      <div className='formRow'>
        <DefaultInput
          id='meuInput'
          type='text'
          labelText='task'
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <p>Próximo intervalo é de 25min</p>
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {state.activeTask && (
          <DefaultButton
            type='button'
            icon={<StopCircleIcon />}
            color='red'
            aria-label='Interromper tarefa atual'
            title='Interromper tarefa atual'
            onClick={handleInterruptTask}
          />
        )}

        {!state.activeTask && (
          <DefaultButton
            type='submit'
            icon={<PlayCircleIcon />}
            color='green'
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
          />
        )}
      </div>
    </form>
  );
}
