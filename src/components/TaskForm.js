import './TaskForm.css';
import {Button, Form, Input, Select, Space} from "antd";
import {DownloadOutlined, CloseOutlined, CloseCircleFilled } from '@ant-design/icons';
import {useForm} from "antd/es/form/Form";

function TaskForm (props) {
    const [form] = useForm()

    const handleSubmit = (formData) => {
        isEditing ? props.editTodo({
            ...formData,
            key: props.todoEditing.key,
        }) : props.addTodo(formData);
        onExitForm()
    };

    const onExitForm = () => {
        props.exitForm()
    };


    const isEditing = props.todoEditing !== null;
    return (
            <Form initialValues={{
                key: isEditing ? props.todoEditing.key : '',
                name: isEditing ? props.todoEditing.name : '',
                status: isEditing ? props.todoEditing.status : false ,
            }}
                form={form}
                onFinish={handleSubmit}
                className="form"
            >

                <div className="form-heading">
                    <h3>
                        {isEditing ? "Update Todo" : "Add Todo"}
                    </h3>
                    <CloseCircleFilled onClick={onExitForm}/>
                </div>

                <Form.Item
                    label="Name"
                    name="name"
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="status"
                >
                    <Select
                        options={[
                            {
                                value: true,
                                label: 'Activated',
                            },
                            {
                                value: false,
                                label: 'Hide',
                            }
                        ]}
                    />
                </Form.Item>

                <Space className="center" >
                    <Button type="primary" htmlType="submit" icon={<DownloadOutlined />}>Save</Button>
                    <Button type="primary" danger icon={<CloseOutlined />} onClick={onExitForm}>Cancel</Button>
                </Space>
            </Form>
    )
}
export default TaskForm;