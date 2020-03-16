import { Component, Vue, Prop } from 'vue-property-decorator'
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import { MVDetail } from '@/types'

@Component
export default class Video extends Vue {
  $refs: {
    /** video 视频播放 ref */
    video: HTMLVideoElement
  }
  @Prop({ required: true }) mv!: MVDetail

  private quality: string = '480'

  private video: HTMLVideoElement = {}

  //  hook
  created() {}

  // methods
  private handleResourceChange(quality: string) {
    this.quality = quality
    // console.log(' this: ', this)
    console.log(' this.$refs: ', this.$refs)
  }

  protected render() {
    const mv = this.mv
    const resources = mv.brs
    return (
      <div>
        <video
          autoplay={false}
          controls
          src={mv.brs[this.quality]}
          style="width:100%;"
          poster={mv.cover}
          ref="video"
        ></video>

        <Dropdown on-command={this.handleResourceChange}>
          <span>{this.quality}P</span>
          <DropdownMenu>
            {Object.keys(resources).map(key => {
              return <DropdownItem command={key}>{key}</DropdownItem>
            })}
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}
