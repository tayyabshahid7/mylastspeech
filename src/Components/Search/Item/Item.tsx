import React from 'react';
import avatarPic from '../../../assets/images/img_avatar.png';
import history from '../../../utils/history';


interface ItemProps {
    name: string,
    image: any,
    id:string,
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

    handleOpen = (id:number,name:string,image:string) => {
      let obj = {id:id, name:name, image:this.getProfilePic(image)}
        history.push({
          pathname: '/speechaccess',
          state:obj,
      });
    }

    getProfilePic(image:any){
      if(image!=null && image !=""){
        return image;
      }else{
        return avatarPic;
      }
    }

    render(){     
        return (
            <li className="item" onClick={this.handleOpen.bind(this,this.props.id,this.props.name,this.props.image)}>
                <img className="item-image" src={this.getProfilePic(this.props.image) } width="60px" height="60px" />
                <div className="item-info">
                <div className="item-name ml-4"> {this.props.name} </div>
                </div>
            </li>
        );
    }
}
export default Item;