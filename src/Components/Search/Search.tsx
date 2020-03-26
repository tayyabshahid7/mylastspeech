import React from 'react';
import './search.scss';
import Item from './Item/Item';
import axios from 'axios';
import * as url from '../../utils/constant';

interface ItemListProps {}
interface ItemListState {
    usersList: Array<Object>,
    showSearchDropDown:boolean,
    searchText:string,
}



class ItemList extends React.Component<ItemListProps, ItemListState> {
    scrollMenuRef:any;
    page = 1;
    state = {
      usersList: [],
      showSearchDropDown:false,
      searchData:[],
      searchText:''
    }

    constructor(props){
      super(props);
      this.scrollMenuRef = React.createRef();
    }

    componentDidMount(){
      if(this.scrollMenuRef){
        this.scrollMenuRef.current.addEventListener('scroll', () => this.handleUsersScroll(this.scrollMenuRef.current));
      }
    }

    componentWillUnmount(){
           if(this.scrollMenuRef){
        this.scrollMenuRef.current.removeEventListener('scroll', () => this.handleUsersScroll(this.scrollMenuRef.current));
      }
    }

    handleUsersScroll = (element)=>{
      // set timeout is necessary as this function may fire multiple times.
        if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
          if(this.page !== -1 ){
            let data = this.state.usersList;
            this.getAllUsers(this.state.searchText, this.page);
            data = data.concat(this.state.usersList);
            this.setState({
              usersList:data,
            });
          }
        }
    };


    getAllUsers = (searchText:string,page:number) => {
      axios.get(url.getUsersListUrl, {
        params: {
          page:this.page,
          text: this.state.searchText,
        }
      })
      .then((response)=> {
          let data = this.state.usersList;
          // data = data.concat(response.data.results);
          this.setState({
            usersList:data,
          });
          var url = response.data.next && new URL(response.data.next);
          this.page = url ?  Number(url.searchParams.get("page")) : -1;
      })
      .catch((error:any)=> {
      })
      .finally(()=> {

      });           
  } 


    handleSearch =(event:any)=>{  
        this.setState({ usersList:[]});    
        var searchQuery = event.target.value.toLowerCase();
        this.page = 1;
        if(searchQuery.length === 0){
          this.setState({showSearchDropDown:false});
        }else{
          this.setState({showSearchDropDown:true});
        }
        this.setState({
          searchText:searchQuery,
          usersList:[]
        },()=>{
          this.getAllUsers(searchQuery,this.page);
        });
           
    }


    render() {
        return (
            <div  id="search">
              <div className="items" >               
                <form action="#" className="ml-5">
                    <div className="input-group rounded-pill  form-inner">
                        <div className="input-group-prepend border-0">
                            <button id="button-addon4" type="button" className="btn btn-link text-info"><i className="fa fa-search"></i></button>
                        </div>
                        <input type="search"  onChange={this.handleSearch.bind(this)}  placeholder="Search" aria-describedby="button-addon4" className="form-control bg-none border-0 custom-input" />
                        
                    </div>
                </form>
                <div className={"after-section ".concat(!this.state.showSearchDropDown ? " d-none":"")}></div>
                <ul ref={this.scrollMenuRef} className={"items-list".concat(!this.state.showSearchDropDown ? " d-none":"")}>
                  
                    {
                      this.state.usersList.length>0 ? this.state.usersList.map(function(el:any) {
                           return <Item
                               key={el.id}
                               name={el.first_name +' '+ el.last_name}
                               image={el.profile_picture}
                               id = {el.id}
                           />;
                       })
                       :
                       <li className="no-result">No results found</li>
                    }
                </ul>
              </div> 
            </div>
           );
    }
};

export default ItemList;