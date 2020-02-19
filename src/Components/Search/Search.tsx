import React from 'react';
import './search.scss';
import Item from './Item/Item';

interface ItemListProps {}
interface ItemListState {
    displayedItems: Array<Object>,
}

var ITEMS=[
    {
      id:1,
      name: 'Geralt',
      image: 'https://i.pinimg.com/736x/34/42/d7/3442d7bda02f7ca7bf0566304c0c939a.jpg',
      phone: '+41242341287',
      email: 'geraltfromrivia@morhen.kaed',
      adress: "Kaer Morhen, Kaedwen"
    },
    {
      id:2,
      name: 'Dandelion',
      image: 'http://i.playground.ru/i/98/19/20/00/wiki/content/y1rqpmxj.250xauto.png',
      phone: '+46785412354',
      email: 'thegreatestpoet@chameleon.red',
      adress: "Cabaret 'Chameleon', Novigrad, Redania"
    },
    {
      id:3,
      name: 'Yennefer',
      image: 'https://vignette2.wikia.nocookie.net/vedmak/images/c/cd/%D0%99%D0%B5%D0%BD%D0%BD%D0%B8%D1%84%D1%8D%D1%80%D0%923.png/revision/latest/scale-to-width-down/350?cb=20160414164624',
      phone: '+28675674329',
      email: 'yen.ven@aretuza.taned',
      adress: "Vengerberg, Aedirn"
    },
   
]

class ItemList extends React.Component<ItemListProps, ItemListState> {
    state = {
      displayedItems: ITEMS
    }

    handleSearch =(event:any)=>{
        var searchQuery = event.target.value.toLowerCase();
        var displayedItems = ITEMS.filter(function(el) {
            var searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });

        this.setState({
          displayedItems: displayedItems
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
                {/* <div className={"after-section "}></div> */}
                <ul className="items-list d-none">
                    {
                       this.state.displayedItems.map(function(el) {
                           return <Item
                               key={el.id}
                               name={el.name}
                               image={el.image}
                           />;
                       })
                    }
                </ul>
              </div> 
            </div>
           );
    }
};

export default ItemList;