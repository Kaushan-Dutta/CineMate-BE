const {userModel,downloadModel,favouriteModel,collectionsModel,collectionContent } = require("../Models/UserModel");
const {contentModel} = require("../Models/ContentModel");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name:"User",
  fields:()=>({
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    profile: { type: GraphQLString },
    username: { type: GraphQLString },
    license: { type: GraphQLString },

    createdContent: {
      type: new GraphQLList(ContentType),
      resolve(parent, args) {
        return(contentModel.find({ owner: parent._id }));
      },
    },})
});

const ContentType = new GraphQLObjectType({
  name:"Content",
  fields:()=>({
    _id: { type: GraphQLString },
    type: { type: GraphQLString },
    description: { type: GraphQLString },
    url: { type: GraphQLString},
    fileId: { type: GraphQLString},
    owner: {
      type: UserType,
      resolve(parent, args) {
        return userModel.findById({_id:parent.owner});
      },
    },})
});
const CollectionType=new GraphQLObjectType({
  name:"Collection",
  fields:()=>({
    _id:{type:GraphQLString},
    collectionName:{type:GraphQLString},
    userEmail:{type:GraphQLString},
    contents:{
      type:new GraphQLList(ContentType),
      async resolve(parent,args){
        let contents=[];
        const collection=await collectionContent.find({collectionId:parent._id});
        for(let i=0;i<collection.length;i++){
          contents.push(contentModel.findById(collection[i].contentId));
        }
        return contents;
      }
    }
  })
})  

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getUser: {
      type: UserType,
      args: { username: { type: GraphQLString } },
      resolve(parent, args) {
        return userModel.findOne({ username: args.username });
      },
    },
    getDownloads: {
      type: new GraphQLList(ContentType),
      args: { email: { type:GraphQLString } },
      async resolve(parent, args) {
        let contents=[];
        const downloads=await downloadModel.find({ userEmail: args.email });
        for(let i=0;i<downloads.length;i++){
            contents.push(contentModel.findById(downloads[i].contentId))
        }
        return contents;
      },
    },
    getFavourites: {
        type: new GraphQLList(ContentType),
        args: { email: { type:GraphQLString } },
        async resolve(parent, args) {
          let contents=[];
          const favourites= await favouriteModel.find({ userEmail: args.email });
          for(let i=0;i<favourites.length;i++){
              contents.push(await contentModel.findById(favourites[i].contentId))
          }
          return contents;
       },
    },
    getContents:{
        type:new GraphQLList(ContentType),
        resolve(parent, args) {
            return contentModel.find({});
        }
    },
    getContent:{
      type:ContentType,
      args:{id:{type:GraphQLString}},
      resolve(parent, args) {
          try{
          return contentModel.findById({_id:args.id});}
          catch(err){
            console.log(err.message);
          }
      }
  },
    getCollections:{
      type:new GraphQLList(CollectionType),
      args:{userEmail:{type:GraphQLString}},
      resolve(parent,args){
        try{
          //console.log(await collectionsModel.find({userEmail:args.userEmail}));
          return collectionsModel.find({userEmail:args.userEmail})
        }
        catch(err){
          console.log(err)
        }
      }
    }
  },
});
const RootMutation=new GraphQLObjectType({
    name:'RootMutation',
    fields:{

      updateLicense:{
         type:GraphQLString,
         args:{email:{type:GraphQLString},license:{type:GraphQLString}},
         resolve(parent,args){
          try{
            return userModel.updateOne({email:args.email},{$set:{license:args.license}})}
          catch(err){
            console.log(err);
          }
         }
      },

      addDownloads:{
         type:ContentType,
         args:{userEmail:{type:GraphQLString},contentId:{type:GraphQLString}},
         async resolve(parent,args){
          try{
            const download= new downloadModel({contentId:args.contentId,userEmail:args.userEmail})
            return await download.save();
          }
          catch(err){
            console.error(err);
          }
      }},

      addFavourites:{
        type:ContentType,
        args:{userEmail:{type:GraphQLString},contentId:{type:GraphQLString}},
        async resolve(parent,args){
          try{

            const favourite= new favouriteModel({contentId:args.contentId,userEmail:args.userEmail})
            return await favourite.save();
          }
          catch(err){
            console.error(err);
          }
     }},

     createContent:{
        type:ContentType,
        args:{type:{type:GraphQLString},description:{type:GraphQLString}
        ,fileId:{type:GraphQLString},url:{type:GraphQLString},owner:{type:GraphQLString}},

        resolve(parent,args){
          //console.log(args.type,args.owner,args.url,args.owner);

          try{
            const create= new contentModel({type:args.type,description:args.description,fileId:args.fileId,url:args.url,owner:args.owner})
            return create.save();}
          catch(err){
            console.log(err);
          }
        }
     },
     deleteContent:{
      type:ContentType,
      args:{_id:{type:GraphQLString}},
      async resolve(parent,args){
          try{
              const deleteContent=await contentModel.findByIdAndDelete(args._id);
              return deleteContent;
          }
          catch(err){
              console.log(err);
          }
      },
     
    }, 
    createCollection:{
        type:CollectionType,
        args:{collectionName:{type:GraphQLString},userEmail:{type:GraphQLString}},
        async resolve(parent,args){
          try{
            const create= new collectionsModel({collectionName:args.collectionName,userEmail:args.userEmail})
            return await create.save();}
          catch(err){
            console.log(err);
          }
        }
    },
    addtoCollection:{
      type:CollectionType,
      args:{collectionId:{type:GraphQLString},contentId:{type:GraphQLString}},
      async resolve(parent,args){
        try{
          const addNew=new collectionContent({collectionId:args.collectionId,contentId:args.contentId});
          return await addNew.save();
        }
        catch(err){
          console.log(err);
        }
      }
    }
  }
})
module.exports=new GraphQLSchema({
  query:RootQuery,
  mutation:RootMutation})

/*
query{
    getUser(username:"referip836"){
    email,
    profile
	}
} 
mutation{
 createContent(type:"Events",description:"Events important",url:"http://event1",owner:"652c01a4ed5519e44a465a62"){
  type,
  description
} 
}
*/


