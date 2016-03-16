import React from 'react'
import autoBind from 'react-autobind'
import ReactDOM from 'react-dom'

export class OptionsMenu extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showMenu:this.props.showMenu,
      outside: this.props.outside
     }
    autoBind(this)
  }

  toggleMenu(){
   this.setState({
      showMenu: !this.state.showMenu
    })
  }

  clickOutside(e) {
    this.setState({
        showMenu: false
    })
  }

  clickDocument(e) {
    const
      component = ReactDOM.findDOMNode(this.refs.checkIfClickOutside),
      clickedOnComponent = !!$(component).has(e.target).length

      if (!clickedOnComponent) {
        //Prevent responding to both click and touchstart - http://stackoverflow.com/questions/7018919/how-to-bind-touchstart-and-click-events-but-not-respond-to-both
        Meteor.setTimeout(()=>{ 
          this.clickOutside(e)
        }, 100)
      }
  }

  componentDidMount() {
    $(document).bind('touchstart click', this.clickDocument)
  }

  componentWillUnmount() {
    $(document).unbind('touchstart click', this.clickDocument)
  }

  showMenu(){
    const userNavMenuItems =  <span><li>{this.props.userName}</li><li><a href="/logout">Sign Out</a></li></span>

    return this.state.showMenu? 
      <ul className='menu-list'>
       {userNavMenuItems}
      </ul>
    :
      null
  }

  render() {

    return (
      <div className="options-menu" ref="checkIfClickOutside">
        <button className="circle-btn" onClick={this.toggleMenu} alt={this.props.title} title={this.props.title}>
        <i className="material-icons">more_vert</i>
        </button>
        {this.showMenu()}
     </div>
    )
  }
}

OptionsMenu.propTypes = { 
  showMenu: React.PropTypes.bool,
  title: React.PropTypes.string
}

OptionsMenu.defaultProps = { 
  showMenu: false,
  title: "More options...",
  outside: false,
  userName: ""
}
