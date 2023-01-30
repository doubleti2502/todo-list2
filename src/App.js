import './App.css';
import {Button, Col, Row, Space, Table, Typography, Input, AutoComplete} from "antd";
import {useEffect, useState} from "react";
import {EditTwoTone, DeleteTwoTone, PlusCircleFilled } from '@ant-design/icons';
import TaskForm from "./components/TaskForm";
import TaskSort from "./components/TaskSort";

const { Title } = Typography;

function App() {
    const [tasks, setTasks] = useState([]);
    const [isDisplayForm, setIsDisplayForm] = useState(false);
    const [todoEditing, setTodoEditing] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortValue, setSortValue] = useState('asc');

    const columns = [
        {
            key: 'key',
            title: 'Index',
            dataIndex: 'key',
            align: 'center',
        },

        {
            title: 'Name',
            dataIndex: 'name',
            align: 'center',
        },

        {
            title: 'Status',
            dataIndex: 'status',
            align: 'center',
            render: (status, todo) => {
                const isActive = status;
                return <Button type="primary" ghost danger={isActive === false} onClick={() => onUpdateStatus(todo.key)}>
                            {isActive ? "Activated" : "Hide"}
                       </Button>
            },
        },

        {
            title: 'Action',
            align: 'center',
            render: (_, todo) => {
                return <Space>
                            <Button icon={<EditTwoTone/>} style={{background: "#BCF0DA"}} onClick={() => onEditTodo(todo)}>Edit</Button>
                            <Button icon={<DeleteTwoTone/>} style={{background: "#FF9B9B"}} onClick={() => onDeleteTodo(todo.key)}>Deleted</Button>
                       </Space>
            },
        },
    ];

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem('tasks')))
    }, []);

    const handleAddTodo = (data) => {
        const newIndex = tasks.length + 1;
        const updateTasks = [...tasks, {
            key: newIndex,
            name: data.name,
            status: data.status,
        }];
        setTasks(updateTasks);
        localStorage.setItem('tasks', JSON.stringify(updateTasks));
        onExitForm()
    };

    const handleEditTodo = (data) => {
        const updateTasks = [...tasks];
        const index = data.key - 1;
        updateTasks[index] = data;
        setTasks(updateTasks)
        localStorage.setItem('tasks', JSON.stringify(updateTasks));
        onExitForm()
    };

    const onDeleteTodo = (key) => {
       const updateTasks = [...tasks].filter((todo) => todo.key !== key).map((todo, index) => ({
           ...todo,
           key: index + 1,
       }));
       setTasks(updateTasks);
       localStorage.setItem('tasks', JSON.stringify(updateTasks));
    };

    const onUpdateStatus = ( key) => {
        const updateTasks = [...tasks].map((todo) =>
            todo.key === key ? {
                ...todo,
                status: !todo.status,
            } : todo);
        setTasks(updateTasks);
        localStorage.setItem('tasks', JSON.stringify(updateTasks));
    };

    const onToggleForm = () => {
        setIsDisplayForm(prevState => !prevState)
    };

    const onExitForm = () => {
        setTodoEditing(null)
        setIsDisplayForm(false)
    };

    const onEditTodo = (todo) => {
        setTodoEditing(todo)
        setIsDisplayForm(true)
    };

    const onSearchTodo = (newKeyword) => {
        setKeyword(newKeyword)
    };

    const onSort = (newSortBy, newSortValue) => {
        setSortBy(newSortBy)
        setSortValue(newSortValue)
    };

    const sortTasks = (listTask) => {
        let newSortValue = sortValue === 'asc' ?  1 : -1;
        if(sortBy === 'name') {
            //asc: tang dan
            // a = 1 ,b = 0 =>  dao b len => 1
            // a = 0, b = 1 => -1

            listTask.sort((a, b) => {
                if(a.name > b.name) return newSortValue;
                else if(a.name < b.name) return -newSortValue;
                else return 0;
            });
        } else {
            //asc: false --> true:

            listTask.sort((a, b) => {
                if(a.status === true && b.status === false) return -newSortValue;
                else if(a.status === false && b.status === true) return newSortValue;
                else return 0;
            });
        }
        return listTask;
    };

    const filterTasks = (listTask) => {
        if(keyword) {
            listTask = listTask.filter((todo) => {
                return todo.name.toLowerCase().indexOf(keyword) !== -1
            })
        }
        return listTask;
    };

  return (
    <div className="container">
        <div className="app-heading">
            <Title type="success">Workflow Management</Title>
        </div>

        <Row gutter={24} align="center">
                {isDisplayForm ?
                    <Col span={6}>
                        <TaskForm
                            addTodo={handleAddTodo}
                            exitForm={onExitForm}
                            todoEditing={todoEditing}
                            editTodo={handleEditTodo}
                        />
                    </Col> : ''}

                <Col span={isDisplayForm ? "14" : "18"}>
                        <Button type="primary" icon={<PlusCircleFilled />} onClick={onToggleForm}>Add Todo</Button>

                        <div className="task-control">
                            <AutoComplete
                                className="task-search-control"
                                onSearch={onSearchTodo}
                            >
                                <Input.Search
                                    placeholder="Enter keywords..."
                                    enterButton
                                />
                            </AutoComplete>

                            <TaskSort
                                onSort={onSort}
                            />
                        </div>

                        <Table dataSource={sortTasks(filterTasks([...tasks]))} columns={columns} bordered pagination={false}></Table>
                </Col>
        </Row>
    </div>
  );
}

export default App;
