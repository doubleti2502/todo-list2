import { Select} from "antd";
import {CaretDownOutlined} from '@ant-design/icons';

function TaskSort(props) {
    const onChange = (value) => {
        const newValue = value.split("_")
        props.onSort(newValue[0], newValue[1])
    };


    return (
        <Select
            onChange={onChange}
            placeholder="Sort"
            icon={<CaretDownOutlined/>}
            style={{width: 150}}
            bordered
            options={[
                {
                    value: 'name_asc',
                    label: 'Name A-Z',

                },

                {
                    value: 'name_desc',
                    label: 'Name Z-A',
                },

                {
                    value: 'status_asc',
                    label: 'Activated Status',
                },

                {
                    value: 'status_desc',
                    label: 'Hide Status',
                },
            ]}
        />
    )
}

export default TaskSort;
