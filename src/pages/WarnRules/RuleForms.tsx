import { Button, Drawer, Form, Input, Radio, Select, Switch } from 'antd';

interface Iprops {
  open: boolean;
  setOpen: (f: boolean) => void;
}

function RuleForms(props: Iprops) {
  const { open, setOpen } = props;
  const [form] = Form.useForm();
  return (
    <Drawer
      title="告警规则"
      open={open}
      width={900}
      onClose={() => setOpen(false)}
      footer={
        <>
          <Button type="primary">取消</Button>
          <Button>确认</Button>
        </>
      }
    >
      <Form
        labelCol={{ span: 3 }}
        // wrapperCol={{ span: 18 }}
        // layout="inline"
        form={form}
        initialValues={{}}
        // onValuesChange={onFormLayoutChange}
        // style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
      >
        <h3>基本配置</h3>
        <Form.Item label="规则标题">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="规则备注">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="告警级别">
          <Radio.Group>
            <Radio value="a">item 1</Radio>
            <Radio value="b">item 2</Radio>
            <Radio value="c">item 3</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="数据资源类型">
          <Select mode="multiple" placeholder="Please select favourite colors">
            <Select.Option value="red">Red</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="执行频率(秒)">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="持续时长(秒)">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="附加标签">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="预案链接">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <h3>生效配置</h3>
        <Form.Item label="立即启用">
          <Switch></Switch>
        </Form.Item>

        <Form.Item label="开始时间-结束时间"></Form.Item>

        <Form.Item label="仅在本业务组生效">
          <Switch></Switch>
          <span>根据告警事件中的Ident归属关系判断</span>
        </Form.Item>

        <Form.Item label="启用恢复通知">
          <Switch></Switch>
        </Form.Item>
        <Form.Item label="留观时长(秒)">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="重复发送频率(分钟)">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="最大发送次数">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="回调地址">
          <Input placeholder="input placeholder" />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default RuleForms;
