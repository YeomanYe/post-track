let regtable = {};

export default class Event{
    static register(event,callback){
        let reciverlist = regtable[event]||[];
        reciverlist.push(callback);
        regtable[event] = reciverlist;
    }
    static unregister(event,callback){
        let reciverlist = regtable[event]||[];
        let mark = -1;
        for(let i=0;i<reciverlist;i++){
            if(reciverlist[i]==callback){
                mark = i;
                break;
            }
        }
        if(mark!=-1){
            reciverlist.splice(mark,1);
        }
    }
    static clear(event){
        regtable[event] = [];
    }
    static emit(event,props){
        let reciverlist = regtable[event];
        console.log("call this");
        if(reciverlist){
            for(let i=0;i<reciverlist.length;i++){
                reciverlist[i](props);
            }
        }
    }
}