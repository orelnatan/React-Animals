

class LocalStorage {

    constructor(){
        
        this.localData = this.getLocalData();

    }
 

    getLocalData(){

        var data = {favorits: [], trash: [], data: []};
		if(typeof(Storage) !== "undefined"){
		  if(localStorage.getItem("AnimalsKingdom") != null) {
				try{
					data = JSON.parse(localStorage.getItem("AnimalsKingdom"));
				}catch(exp){}
		    }      
			return data;		 
	   }
       return data;				
    }

    getFromLocalData(field, all = false){
        
        let storage = JSON.parse(JSON.stringify(this.localData));

        return all ? storage : storage[field];
    }

    toggleFavorite(id){
        this.isExist(id, 'favorits') ? this.unFavorite(id) : this.addNewFavorite(id);
    }

    addNewFavorite(id){

        let newData = this.localData;
        let index = this.findItemIndexById(newData.data, id);
        newData.data[index].isFavorite = true;

        let item = newData.data[index];

        newData.favorits.push(item);
        this.updateLocalData(newData);
    }

    unFavorite(id){

        let newData = this.localData;
        let index = this.findItemIndexById(newData.data, id);
        newData.data[index].isFavorite = false;

        index = this.findItemIndexById(newData.favorits, id);
        newData.favorits.splice(index, 1);
        this.updateLocalData(newData);
    }

    removeItem(id){
        
        this.isExist(id, 'favorits') ? this.unFavorite(id) : null;

        let newData = this.localData;

        var index = this.findItemIndexById(newData.data ,id);
        var item = newData.data[index];
        item.isTrash = true;

        newData.data.splice(index, 1);
        newData.trash.push(item);
        this.updateLocalData(newData);
    }

    shredItemForEver(id){

        var newData = this.localData;

        var index = this.findItemIndexById(newData.trash, id);
        newData.trash.splice(index, 1);
        this.updateLocalData(newData);
    }
  
    addItem(item){

        var newData = this.localData;

        newData.data.push(item);
        this.updateLocalData(newData);
    }

    recycleItem(id){

        var newData = this.localData;

        var index = this.findItemIndexById(newData.trash, id);
        var item = newData.trash[index];
        item.isTrash = false;

        newData.trash.splice(index, 1);
        newData.data.push(item);
        this.updateLocalData(newData);
    }

    isExist(id, field){

        var newData = this.localData;

        return this.findItemIndexById(newData[field], id) != -1 ? true : false;
    }

    findItemIndexById(list, id){
        return list.map(function(item) {   
                        return item.id; 
                    }).indexOf(id);
    }

    updateLocalData(newData){
        localStorage.removeItem("AnimalsKingdom");
        localStorage.setItem("AnimalsKingdom", JSON.stringify(newData));
    }

}

export default LocalStorage = new LocalStorage();