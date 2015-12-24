/**
 * Created by CedricLecat on 18/11/15.
 */
function Event(id,collapseId,name,description,date,time,maxmember,membersid,location,price,picture,tags){
    this.id = id;
    this.collapseId = collapseId;
    this.name = name;
    this.description = description;
    this.date = date;
    this.time = time;
    this.maxmember = maxmember;
    this.members = membersid;
    this.location = location;
    this.price = price;
    this.picture = picture;
    this.tags = tags;
}