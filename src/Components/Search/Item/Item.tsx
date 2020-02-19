import React from 'react';

interface ItemProps {
    name: string,
    image: any,
}
interface ItemState {
    isOpened:boolean,
 }


class Item extends React.Component<ItemProps, ItemState> {
    state = {
        isOpened:false,
        name:"",
        phoneNumber:"",
    }
    handleOpen(){
        if(this.state.isOpened == true)
        {
          this.setState({
            isOpened:false
          });
        }else{
          this.setState({
            isOpened:true
          });
        }
      }
      render(){
        if(this.state.isOpened == true){
          return (
              <li className="item" onClick={this.handleOpen}>
                  <img className="item-image" src={this.props.image} width="60px" height="60px" />
                  <div className="item-info">
                      <div className="item-name"> {this.props.name} </div>
                  </div>
              </li>
          );
        } else {
          return (
              <li className="item" onClick={this.handleOpen}>
                  <img className="item-image" src={this.props.image} width="60px" height="60px" />
                  <div className="item-info">
                  <div className="item-name ml-4"> {this.props.name} </div>
                  </div>
              </li>
          );
        }

      }
}
export default Item;