//@flow
let regtable = {};


export default class Event{
    static register(event: string,callback: Function){
        let reciverlist = regtable[event]||[];
        reciverlist.push(callback);
        regtable[event] = reciverlist;
    }
    static unregister(event: string,callback: Function){
        let reciverlist = regtable[event]||[];
        let mark = -1;
        for(let i=0,len=reciverlist.length;i<len;i++){
            if(reciverlist[i]==callback){
                mark = i;
                break;
            }
        }
        if(mark!=-1){
            reciverlist.splice(mark,1);
        }
    }
    static clear(event: string){
        regtable[event] = [];
    }
    static emit(event: string,props: ?any){
        let reciverlist = regtable[event];
        console.log("call this");
        if(reciverlist){
            for(let i=0;i<reciverlist.length;i++){
                reciverlist[i](props);
            }
        }
    }
}