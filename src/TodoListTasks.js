import React from 'react';
import TodoListTask from './TodoListTask';

class TodoListTasks extends React.Component {
    render = () => {

        let subjectElements = this.props.subjects.map((subj) => {
            return <TodoListTask title={subj.title} isDone={subj.isDone} priority={subj.priority}/>

        });


        return (
            <div className='todoList-Tasks'>
                {subjectElements}
            </div>
        );
    }
}

export default TodoListTasks;

