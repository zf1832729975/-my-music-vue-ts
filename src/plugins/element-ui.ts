import Vue from 'vue'
// import ElementUI from 'element-ui'

// // Vue.use(ElementUI, { size: 'small' })
// Vue.use(ElementUI, { size: 'mini' })

import {
  Container,
  Badge,
  Main,
  Aside,
  Header,
  Footer,
  Row,
  Col,
  Button,
  ButtonGroup,
  Divider,
  Avatar,
  Slider,
  Image,
  Popover,
  Dropdown,
  DropdownItem,
  Carousel,
  CarouselItem,
  DropdownMenu,
  Table,
  TabPane,
  TableColumn,
  Tabs,
  Tag,
  Input,
  ColorPicker,
  Loading,
  Dialog,
  Form,
  FormItem,
  Checkbox,
  Tooltip,
  Notification,
  Message,
  Pagination,
  Progress
} from 'element-ui'

// @ts-ignore
import Scrollbar from 'element-ui/lib/scrollbar'
Vue.use(Scrollbar)

Vue.use(Container)
Vue.use(Main)
Vue.use(Badge)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Divider)
Vue.use(Avatar)
Vue.use(Slider)
Vue.use(Image)
Vue.use(Dropdown)
Vue.use(Popover)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Table)
Vue.use(TabPane)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(Input)
Vue.use(ColorPicker)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Checkbox)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Progress)

// mini small medium
Vue.prototype.$ELEMENT = { size: 'mini' }
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
