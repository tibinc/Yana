import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

 import { Mongo } from 'meteor/mongo';



PostList=new Mongo.Collection('posts');
CommentList=new Mongo.Collection('comments');
HostList=new Mongo.Collection('hosts');
GuestList=new Mongo.Collection('guests ');
UserInfo=new Mongo.Collection('userinfo');
UserInbox=new Mongo.Collection('userinbox');
ChatBox=new Mongo.Collection('chatbox');
BlogBox=new Mongo.Collection('blogbox');
BlogComments=new Mongo.Collection('blogcomments');


var imageStore = new FS.Store.GridFS('images');

Images = new FS.Collection('images', {
 stores: [imageStore]
});





Router.route('/', function () {
  this.render('home');
});

Router.route('/post', function () {
  this.render('post');
});

Router.route('/comment', function () {
  this.render('comment');
});

Router.route('/host', function () {
  this.render('host');
});

Router.route('/guest', function () {
  this.render('guest');
});

Router.route('/myAccount', function () {
  this.render('myAccount');
});

Router.route('/viewHost', function () {
  this.render('viewHost');
});

Router.route('/viewGuest', function () {
  this.render('viewGuest');
});

Router.route('/createProfile', function () {
  this.render('createProfile');
});

Router.route('/viewProfile', function () {
  this.render('viewProfile');
});

Router.route('/editStatus', function () {
  this.render('editStatus');
});

Router.route('/viewRequestResults', function () {
  this.render('viewRequestResults');
});

Router.route('/viewMatchingRequests', function () {
  this.render('viewMatchingRequests');
});

Router.route('/sendEnquiry', function () {
  this.render('sendEnquiry');
});

Router.route('/myInbox', function () {
  this.render('myInbox');
});

Router.route('/viewOtherProfile', function () {
  this.render('viewOtherProfile');
});

Router.route('/chat', function () {
  this.render('chat');
});

Router.route('/chatWindow', function () {
  this.render('chatWindow');
});

Router.route('/travelBlogs', function () {
  this.render('travelBlogs');
});

Router.route('/viewBlogs', function () {
  this.render('viewBlogs');
});

Router.route('/allComments', function () {
  this.render('allComments');
});

Router.route('/allPosts', function () {
  this.render('allPosts');
});

Router.route('/otherAllPosts', function () {
  this.render('otherAllPosts');
});

Router.route('/otherAllComments', function () {
  this.render('otherAllComments');
});


Router.route('/searchHost', function () {
  this.render('searchHost');
});

Router.route('/editProfilePic', function () {
  this.render('editProfilePic');
});

Router.route('/blogComment', function () {
  this.render('blogComment');
});





if(Meteor.isClient)
{






Template.myInbox.rendered = function() {

   var obj=document.getElementById('notification');

   obj.setAttribute('hidden', 'hidden');

  Meteor.call('UpdateMessageStatus');
}

Template.chat.rendered = function() {

   var obj=document.getElementById('chatnotification');

   obj.setAttribute('hidden', 'hidden');

  Meteor.call('UpdateChatMessageStatus');
}

//......................................................................Template.body helpers.......................................................................




Template.body.helpers({

'userinfo':function()

{
var userId=Meteor.userId();



return UserInfo.find({UserId :userId });



}




});



//......................................................................Template.home helpers.......................................................................



Template.home.helpers({

'showname':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'todaysblog':function()

{



return BlogBox.find({},{sort: {createdAt: -1},limit:1});

}

});




//......................................................................Template.post helpers.......................................................................




Template.post.helpers({

'postvalue':function()

{

return PostList.find({},{sort: {createdAt: -1}});


},

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'showname':function()
{

var userId=this.UserId;

return UserInfo.find({UserId :userId });



}


});





//......................................................................Template.comment helpers.......................................................................



Template.comment.helpers({

'commentvalue':function()

{
  var postId=Session.get('PostId');
  selector = {postId:postId};
  options = {sort: {createdAt: -1}};
  return CommentList.find(selector, options);
  
  

},
'postview':function()
{
var postId=Session.get('PostId');
  selector = {_id:postId};
  options = {sort: {createdAt: -1}};
  return PostList.find(selector);


},

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},
'showname':function()
{

var userId=this.UserId;

return UserInfo.find({UserId :userId });



},



});




//..........................................................................Template.host helpers.......................................................................




Template.host.helpers({

'hostvalue':function()

{

return HostList.find({},{sort: {createdAt: -1}});


},

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

}

});




//......................................................................Template.guest helpers.......................................................................



Template.guest.helpers({

'guestvalue':function()

{

return GuestList.find({},{sort: {createdAt: -1}});


},

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

});




//......................................................................Template.searchHost helpers.......................................................................




Template.searchHost.helpers({

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'searchresults':function()

{
var SearchPlace=Session.get('SearchedPlaceName');

var hostType=Session.get('HostType');


return HostList.find({HostLoc:SearchPlace,HostType:hostType},{sort: {createdAt: -1}});



},

'searchresults2':function()

{
var SearchPlace=Session.get('SearchedPlaceName');

var hostType=Session.get('HostType');



return HostList.find( { $and: [ {HostLoc:SearchPlace}, {HostType:{ $ne:hostType }} ] },{sort: {createdAt: -1}});

}


});



//......................................................................Template.myAccount helpers.......................................................................




Template.myAccount.helpers({


'showname':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });



},



'myposts':function()

{

var UserId=Meteor.userId();

return PostList.find({UserId:UserId },{sort: {createdAt: -1},limit:3});


},

'myHostLoc':function()

{

var UserId=Meteor.userId();

return HostList.find({UserId :UserId },{sort: {createdAt: -1}});


},

'myGuestLoc':function()

{

var UserId=Meteor.userId();

return GuestList.find({UserId :UserId },{sort: {createdAt: -1}});


},

'myBlogs':function()

{

var UserId=Meteor.userId();

return BlogBox.find({UserId :UserId },{sort: {createdAt: -1}});


},

'myComments':function()
{
var UserId=Meteor.userId();
return CommentList.find({UserId :UserId },{sort: {createdAt: -1},limit:3});

},

'myCommentPost':function()
{
var postId=this.postId;

return PostList.find({_id:postId });


},

'myCommentPostOwner':function()


{
var userId=this.UserId;
return UserInfo.find({UserId:userId});


}


});




//......................................................................Template.allComments helpers.......................................................................



Template.allComments.helpers({

'myComments':function()
{
var UserId=Meteor.userId();
return CommentList.find({UserId :UserId },{sort: {createdAt: -1}});

},

'myCommentPost':function()
{
var postId=this.postId;

return PostList.find({_id:postId });


},

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'myCommentPostOwner':function()


{
var userId=this.UserId;
return UserInfo.find({UserId:userId});


}


});



//......................................................................Template.allPosts helpers.......................................................................




Template.allPosts.helpers({

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'myposts':function()

{

var UserId=Meteor.userId();

return PostList.find({UserId:UserId },{sort: {createdAt: -1}});


}

});



//......................................................................Template.editStatus helpers.......................................................................




Template.editStatus.helpers({

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'editStatus':function()
{

var customerInfoId=Session.get('CustomerInfoId');

return UserInfo.find({_id:customerInfoId});


}



});



//......................................................................Template.editProfilePic helpers.......................................................................




Template.editProfilePic.helpers({

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'editProfilePic':function()
{

var customerInfoId=Session.get('CustomerInfoId');

return UserInfo.find({_id:customerInfoId});


}



});




//......................................................................Template.viewHost helpers.......................................................................




Template.viewHost.helpers({

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'viewHost':function()
{

var hostId=Session.get('HostId');
return HostList.find({_id:hostId});


}



});




//......................................................................Template.viewGuest helpers.......................................................................



Template.viewGuest.helpers({

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'viewGuest':function()
{

var guestId=Session.get('GuestId');
return GuestList.find({_id:guestId});


}



});




//......................................................................Template.viewProfile helpers.......................................................................


 
Template.viewProfile.helpers({

'viewProfile':function()
{

var userId=Meteor.userId();
return UserInfo.find({UserId:userId});


}



});




//......................................................................Template.viewRequestResults helpers.......................................................................

 

Template.viewRequestResults.helpers({

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'viewResult':function()
{

var requestId=Session.get('RequestId');

var requestPlace=Session.get('RequestPlace');

return HostList.find({HostLoc:requestPlace});


}



});




//......................................................................Template.viewMatchingRequests helpers.......................................................................




Template.viewMatchingRequests.helpers({

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'viewResult':function()
{

var requestId=Session.get('RequestId');

var hostPlace=Session.get('HostPlace');

return GuestList.find({HostLoc:hostPlace});


}



});




//......................................................................Template.sendEnquiry helpers.......................................................................



Template.sendEnquiry.helpers({

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

}

});


//......................................................................Template.myInbox helpers.......................................................................




Template.myInbox.helpers({
'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'viewMessages':function(){


var userId=Meteor.userId();
return UserInbox.find({ReceiverId:userId},{sort: {TimeStamp: -1}});



},

'viewSender':function(){
return UserInfo.find({UserId:this.SenderId});


},

'sentMessages':function(){


var userId=Meteor.userId();
return UserInbox.find({SenderId:userId},{sort: {TimeStamp: -1}});

},

'viewReceiver':function(){
return UserInfo.find({UserId:this.ReceiverId});

}

});




//......................................................................Template.viewOtherProfile helpers.......................................................................



Template.viewOtherProfile.helpers({

'viewOtherProfile':function()

{
var userId=Session.get('UserId');


return UserInfo.find({UserId:userId});


},

'viewOtherProfilePosts':function()

{
var userId=Session.get('UserId');

return PostList.find({UserId :userId },{sort: {createdAt: -1},limit:3});

},



'viewOtherProfileHostLoc':function()


{
var userId=Session.get('UserId');
return HostList.find({UserId :userId },{sort: {createdAt: -1}});




},

'viewOtherProfileGuestLoc':function()


{
var userId=Session.get('UserId');
return GuestList.find({UserId :userId },{sort: {createdAt: -1}});




},


'viewOtherProfileBlogs':function()


{
var userId=Session.get('UserId');
return BlogBox.find({UserId :userId },{sort: {createdAt: -1},limit:2});




},


'viewOtherProfileComments':function()


{
var userId=Session.get('UserId');
return CommentList.find({UserId :userId },{sort: {createdAt: -1},limit:3});




},

'otherCommentPost':function()
{
var postId=this.postId;

return PostList.find({_id:postId });


},

'otherCommentPostOwner':function()


{
var userId=this.UserId;
return UserInfo.find({UserId:userId});


}



});




//......................................................................Template.otherAllPosts helpers.......................................................................



Template.otherAllPosts.helpers({


'viewAllOtherProfilePosts':function()

{
var userId=Session.get('UserId');

return PostList.find({UserId :userId },{sort: {createdAt: -1}});

}
});





//......................................................................Template.otherAllComments helpers.......................................................................



Template.otherAllComments.helpers({


'viewAllOtherProfileComments':function()

{
var userId=Session.get('UserId');

return CommentList.find({UserId :userId },{sort: {createdAt: -1}});

},
'otherCommentPost':function()
{
var postId=this.postId;

return PostList.find({_id:postId });


},

'otherCommentPostOwner':function()


{
var userId=this.UserId;
return UserInfo.find({UserId:userId});


}

});




//......................................................................Template.chat helpers.......................................................................



Template.chat.helpers({

'viewcontacts':function()
{

userId=Meteor.userId();


return UserInfo.find( { UserId: { $ne:userId } } );
 
},

'checkprofile':function()
{
userId=Meteor.userId();
return UserInfo.find( {UserId:userId } );


},

'recentchats':function()


{

var userId=Meteor.userId();
return ChatBox.find({$or: [{SenderId:userId},{ReceiverId:userId} ] },{sort: {TimeStamp: -1},limit:5});  



},
'viewSender':function()

{

return UserInfo.find({UserId:this.SenderId});



},

'viewReceiver':function()

{

return UserInfo.find({UserId:this.ReceiverId});



}




});




//......................................................................Template.chatWindow helpers.......................................................................



Template.chatWindow.helpers({

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'viewchats':function()
{

userId=Meteor.userId();

var buddyId=Session.get('BuddyId');


return ChatBox.find(  {$or:  [  { $and: [ {SenderId:userId}, {ReceiverId:buddyId} ] }, { $and: [ {SenderId:buddyId}, {ReceiverId:userId} ] }  ] },{sort: {TimeStamp: -1}});

 
},

'viewSender':function()

{

return UserInfo.find({UserId:this.SenderId});



}


});

//......................................................................Template.travelBlogs helpers.......................................................................

Template.travelBlogs.helpers({


'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

}



});

//......................................................................Template.viewBlogs helpers.......................................................................




Template.viewBlogs.helpers({

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},

'viewblogs':function()
{

return BlogBox.find({},{sort: {createdAt: -1}});

}

});



//......................................................................Template.blogComment helpers.......................................................................


Template.blogComment.helpers({

'commentvalue':function()

{
  var blogId=Session.get('BlogId');
  selector = {blogId:blogId};
  options = {sort: {createdAt: -1}};
  return BlogComments.find(selector, options);
  
  

},
'blogview':function()
{
var blogId=Session.get('BlogId');
  selector = {_id:blogId};
  options = {sort: {createdAt: -1}};
  return BlogBox.find(selector);


},

'userinfo':function()
{

var userId=Meteor.userId();

return UserInfo.find({UserId :userId });

},
'showname':function()
{

var userId=this.UserId;

return UserInfo.find({UserId :userId });



},





});


//...............................................................................Events.........................................................................................




//.................................................................Template.home events.........................................................................................


Template.home.events({

'click .blogcomment':function()
{
var blogId=this._id;

Session.set('BlogId',blogId);

}

});


//.................................................................Template.post events.........................................................................................



Template.post.events({

'submit form': function(event){
 
  event.preventDefault();

 var currentUserEmail = Meteor.user().emails[0].address;
 var postContent=event.target.postcontent.value;


 

Meteor.call('postMethod',postContent,currentUserEmail);



event.target.postcontent.value = "";





},



'click .viewOtherProfile':function()

{

var userId=this.UserId;

Session.set('UserId',userId);

},


'click .comment':function()
{
var postId=this._id;
console.log(postId);
Session.set('PostId',postId);

}
});



//...............................................................Template.comment events.........................................................................................



Template.comment.events({

'submit form': function(event)

{
var postId=Session.get('PostId');
event.preventDefault();
var commentContent=event.target.commentcontent.value;
var currentUserEmail = Meteor.user().emails[0].address;

Meteor.call('commentMethod',commentContent,currentUserEmail,postId);



event.target.commentcontent.value = "";
 

},

'click .viewOtherProfile':function()

{

var userId=this.UserId;

Session.set('UserId',userId);



}

});



//............................................................Template.allComments events.........................................................................................



Template.allComments.events({

'click .deletecomment':function()
{
var commentId=this._id;
var r=confirm("Do you want to delete this comment?You can't undo this action");
if(r==true)
{


Meteor.call('deleteComment', commentId);
alert("The comment has been deleted");

}

},
'click .viewconversation':function()
{
var postId=this._id;
console.log(postId);
Session.set('PostId',postId);

}
});




//.................................................................Template.allPosts events.........................................................................................



Template.allPosts.events({


'click .viewcomments':function()
{
var postId=this._id;

Session.set('PostId',postId);

},

'click .deletepost':function()
{
var postId=this._id;

var r=confirm("Do you want to delete this post?You can't undo this action");
if(r==true)
{

Meteor.call('deletePost',postId);
alert("The post has been deleted");

}

}

});




//.................................................................Template.host events.........................................................................................





Template.host.events({

'submit form': function(event)

{

event.preventDefault();
var fullName=event.target.fullname.value;
var address=event.target.addr_first.value;
var street=event.target.street.value;
var country=event.target.country.value;
var state=event.target.state.value;
var postCode=event.target.postalcode.value;
var mobile=event.target.mobile.value;
var email=event.target.email.value;
var hostLocation=event.target.location.value;
var hostType=event.target.hostType.value;
var preference=event.target.preferences.value;

Meteor.call('createHost',fullName,address,street,country,state,postCode,mobile,email,hostLocation,hostType,preference);

event.target.fullname.value= "";
event.target.addr_first.value= "";
event.target.street.value= "";
event.target.country.value= "";
event.target.state.value= "";
event.target.postalcode.value= "";
event.target.mobile.value= "";
event.target.email.value= "";
event.target.location.value= "";
event.target.hostType.value= "";
event.target.preferences.value= "";
alert("Congratulations!!Thank you for choosing to be a PathBuddy partner");



 
}

});



//.................................................................Template.guest events.........................................................................................




Template.guest.events({

'submit form': function(event)

{

event.preventDefault();
var fullName=event.target.fullname.value;
var address=event.target.addr_first.value;
var street=event.target.street.value;
var country=event.target.country.value;
var state=event.target.state.value;
var postCode=event.target.postalcode.value;
var mobile=event.target.mobile.value;
var email=event.target.email.value;
var hostLocation=event.target.location.value;
var hostType=event.target.hostType.value;
var count=event.target.count.value;
var preference=event.target.preferences.value;

Meteor.call('createGuest',fullName,address,street,country,state,postCode,mobile,email,hostLocation,hostType,count,preference);

event.target.fullname.value= "";
event.target.addr_first.value= "";
event.target.street.value= "";
event.target.country.value= "";
event.target.state.value= "";
event.target.postalcode.value= "";
event.target.mobile.value= "";
event.target.email.value= "";
event.target.location.value= "";
event.target.hostType.value= "";
event.target.count.value="";
event.target.preferences.value= "";
alert("Congratulations!!Thank you for choosing to be a PathBuddy guest");

}


});




//...........................................................Template.searchHost events.........................................................................................



Template.searchHost.events({

'submit form':function(event)
{
event.preventDefault();



var searchedPlace=event.target.searchplace.value;
var hostType=event.target.hosttype.value;

var SearchedPlace= searchedPlace.toUpperCase();
Session.set('SearchedPlaceName',SearchedPlace);

Session.set('HostType', hostType);
},

'click .sendEnquiry':function()
{

var receiverId=this.UserId;
Session.set('ReceiverId', receiverId);




}


});



//.................................................................Template.myAccount events.........................................................................................




Template.myAccount.events({

'click .editstatus':function()
{
var customerInfoId=this._id;
Session.set('CustomerInfoId',customerInfoId);

},

'click .editprofilepic':function()
{
var customerInfoId=this._id;
Session.set('CustomerInfoId',customerInfoId);

},

'click .viewcomments':function()
{
var postId=this._id;

Session.set('PostId',postId);

},

'click .deletepost':function()
{
var postId=this._id;

var r=confirm("Do you want to delete this post?You can't undo this action");
if(r==true)
{

Meteor.call('deletePost',postId);
alert("The post has been deleted");

}

},

'click .blogcomment':function()
{
var blogId=this._id;

Session.set('BlogId',blogId);

},

'click .deleteblog':function()
{
var blogId=this._id;
var r=confirm("Do you want to delete this blog?You can't undo this action");
if(r==true)
{


Meteor.call('deleteBlog',blogId);
alert("The blog has been deleted");

}

},
'click .deletecomment':function()
{
var commentId=this._id;
var r=confirm("Do you want to delete this comment?You can't undo this action");
if(r==true)
{


Meteor.call('deleteComment', commentId);
alert("The comment has been deleted");

}


},


'click .viewOtherProfile':function()

{

var userId=this.UserId;

Session.set('UserId',userId);

},

'click .viewconversation':function()
{
var postId=this._id;
console.log(postId);
Session.set('PostId',postId);

},



'click .viewhost':function()
{
var hostId=this._id;
console.log(hostId);
Session.set('HostId',hostId);

},

'click .viewguest':function()
{
var guestId=this._id;
console.log(guestId);
Session.set('GuestId',guestId);

},

'click .viewrequestresults':function()
{

var requestId=this._id;
var requestPlace=this.HostLoc;
console.log(requestPlace);

Session.set('Requestd',requestId);

Session.set('RequestPlace',requestPlace);


},

'click .viewmatchingrequests':function()
{

var requestId=this._id;
var hostPlace=this.HostLoc;
console.log(hostPlace);

Session.set('Requestd',requestId);

Session.set('HostPlace',hostPlace);


},




});


//............................................................Template.editStatus events........................................................................................




Template.editStatus.events({
'submit form':function(event)
{
event.preventDefault();
var customerInfoId=Session.get('CustomerInfoId');

var status=event.target.status.value;

Meteor.call('updateStatus',status,customerInfoId);

Router.go('myAccount', {name: '/myAccount'});



}

});


//........................................................Template.editProfilePic events........................................................................................



Template.editProfilePic.events({
'submit form':function(event)
{
event.preventDefault();
var customerInfoId=Session.get('CustomerInfoId');


var file = event.target.profilepic.files[0]; //assuming 1 file only

    if (!file) return;

    var reader = new FileReader();
 //create a reader according to HTML5 File API

reader.onload = function(event)

{   

 var result = reader.result       



Meteor.call('updateProfilePic',result, customerInfoId);

}

reader.readAsDataURL(file); //read the file as arraybuffer

Router.go('myAccount', {name: '/myAccount'});



}

});





//.................................................................Template.viewHost events.........................................................................................



Template.viewHost.events({

'submit form':function(event)
{

var hostId=Session.get('HostId');
event.preventDefault();
var fullName=event.target.fullname.value;
var address=event.target.addr_first.value;
var street=event.target.street.value;
var country=event.target.country.value;
var state=event.target.state.value;
var postCode=event.target.postalcode.value;
var mobile=event.target.mobile.value;
var email=event.target.email.value;
var hostLocation=event.target.location.value;
var hostType=event.target.hostType.value;
var preference=event.target.preferences.value;

Meteor.call('updateHost',fullName,address,street,country,state,postCode,mobile,email,hostLocation,hostType,preference,hostId);

event.target.fullname.value= "";
event.target.addr_first.value= "";
event.target.street.value= "";
event.target.country.value= "";
event.target.state.value= "";
event.target.postalcode.value= "";
event.target.mobile.value= "";
event.target.email.value= "";
event.target.location.value= "";
event.target.hostType.value= "";
event.target.preferences.value= "";
alert("Success!!The updated host profile has been saved");

}

});



//.................................................................Template.viewGuest events.........................................................................................



Template.viewGuest.events({

'submit form':function(event)
{

var guestId=Session.get('GuestId');
event.preventDefault();

var fullName=event.target.fullname.value;
var address=event.target.addr_first.value;
var street=event.target.street.value;
var country=event.target.country.value;
var state=event.target.state.value;
var postCode=event.target.postalcode.value;
var mobile=event.target.mobile.value;
var email=event.target.email.value;
var hostLocation=event.target.location.value;
var hostType=event.target.hostType.value;
var count=event.target.count.value;
var preference=event.target.preferences.value;

Meteor.call('updateGuest',fullName,address,street,country,state,postCode,mobile,email,hostLocation,hostType,count,preference,guestId);

event.target.fullname.value= "";
event.target.addr_first.value= "";
event.target.street.value= "";
event.target.country.value= "";
event.target.state.value= "";
event.target.postalcode.value= "";
event.target.mobile.value= "";
event.target.email.value= "";
event.target.location.value= "";
event.target.hostType.value= "";
event.target.count.value="";
event.target.preferences.value= "";


alert("Success!!The updated guest request has been saved");

}

});





//..........................................................Template.createProfile events...................................................................................




Template.createProfile.events({

'submit form':function(event,template)
{

event.preventDefault();
var firstName=event.target.firstname.value;
var lastName=event.target.lastname.value;
var address=event.target.addr_first.value;
var street=event.target.street.value;
var country=event.target.country.value;
var state=event.target.state.value;
var postCode=event.target.postalcode.value;
var mobile=event.target.mobile.value;
var email=event.target.email.value;
var status=event.target.status.value;
var file = event.target.profilepic.files[0]; //assuming 1 file only

    if (!file) return;

    var reader = new FileReader();
 //create a reader according to HTML5 File API

reader.onload = function(event)

{   

 var result = reader.result       



Meteor.call('createProfile',firstName,lastName,address,street,country,state,postCode,mobile,email,status,result);

}

reader.readAsDataURL(file); //read the file as arraybuffer



alert("Success!!Your PathBuddy profile has been created");

event.target.firstname.value= "";
event.target.lastname.value= "";
event.target.addr_first.value= "";
event.target.street.value= "";
event.target.country.value= "";
event.target.state.value= "";
event.target.postalcode.value= "";
event.target.mobile.value= "";
event.target.email.value= "";
event.target.status.value= "";
}

});



//..........................................................Template.viewProfile events.........................................................................................





Template.viewProfile.events({

'submit form':function(event)
{

event.preventDefault();
var firstName=event.target.firstname.value;
var lastName=event.target.lastname.value;
var address=event.target.addr_first.value;
var street=event.target.street.value;
var country=event.target.country.value;
var state=event.target.state.value;
var postCode=event.target.postalcode.value;
var mobile=event.target.mobile.value;
var email=event.target.email.value;
var status=event.target.status.value;
var file = event.target.profilepic.files[0]; //assuming 1 file only

    if (!file) return;

    var reader = new FileReader();
 //create a reader according to HTML5 File API

reader.onload = function(event)

{   

 var result = reader.result       


Meteor.call('updateProfile',firstName,lastName,address,street,country,state,postCode,mobile,email,status,result);

}
reader.readAsDataURL(file); //read the file as arraybuffer



alert("Success!!The updated profile has been saved");

}

});



//.................................................Template.viewRequestResults events.........................................................................................



Template.viewRequestResults.events({

'click .sendEnquiry':function()
{
var receiverId=this.UserId;
Session.set('ReceiverId', receiverId);




}


});




//............................................................Template.sendEnquiry events.........................................................................................



Template.sendEnquiry.events({

'submit form':function(event)
{
event.preventDefault();
var receiverId=Session.get('ReceiverId');

var message=event.target.enquirymessage.value;
Meteor.call('SendMessage',message,receiverId);
event.target.enquirymessage.value="";

alert("Your message has been sent");


}


});




//.................................................................Template.myInbox events.........................................................................................




Template.myInbox.events({

'click .viewOtherProfile':function()

{

var userId=this.UserId;

Session.set('UserId',userId);



},
'click .sendEnquiry':function()
{
var receiverId=this.UserId;
console.log(receiverId);
Session.set('ReceiverId', receiverId);




}


});




//......................................................Template.viewOtherProfile events........................................................................................




Template.viewOtherProfile.events({

'click .sendEnquiry':function()
{
var receiverId=this.UserId;
console.log(receiverId);
Session.set('ReceiverId', receiverId);




},

'click .viewcomments':function()
{
var postId=this._id;

Session.set('PostId',postId);

},

'click .viewconversation':function()
{
var postId=this._id;
console.log(postId);
Session.set('PostId',postId);

},
'click .viewOtherProfile':function()

{

var userId=this.UserId;

Session.set('UserId',userId);

}


});





//......................................................Template.otherAllPosts events.........................................................................................




Template.otherAllPosts.events({


'click .viewcomments':function()
{
var postId=this._id;

Session.set('PostId',postId);

}
});




//.......................................................Template.otherAllComments events.........................................................................................




Template.otherAllComments.events({


'click .viewconversation':function()
{
var postId=this._id;
console.log(postId);
Session.set('PostId',postId);

},
'click .viewOtherProfile':function()

{

var userId=this.UserId;

Session.set('UserId',userId);

}
});




//.................................................................Template.chat events.........................................................................................




Template.chat.events({

'click .chat':function()

{
var buddyId=this.UserId;

Session.set('BuddyId', buddyId);



},


'click .viewOtherProfile':function()

{

var userId=this.UserId;
console.log(userId);

Session.set('UserId',userId);



}


});





//............................................................Template.chatWindow events.........................................................................................



Template.chatWindow.events({

'submit form':function(event)

{
event.preventDefault();

var buddyId=Session.get('BuddyId');

var message=event.target.chatmessage.value;

Meteor.call('SendChat',message,buddyId);

event.target.chatmessage.value='';


}


});




//...........................................................Template.travelBlogs events.........................................................................................



Template.travelBlogs.events({

'submit form':function(event)
{

event.preventDefault();

var heading=event.target.blogheading.value;
var blog=event.target.travelblog.value;
var firstName=event.target.bloggerFirstName.value;
var lastName=event.target.bloggerLastName.value;
var email=event.target.bloggerEmail.value;
Meteor.call('insertBlog',heading,blog,firstName,lastName,email);


event.target.blogheading.value="";
event.target.travelblog.value="";
event.target.bloggerFirstName.value="";
event.target.bloggerLastName.value="";
event.target.bloggerEmail.value="";

alert("Your blog has been submitted successfully");

}


});



//...........................................................Template.viewBlogs events.........................................................................................

Template.viewBlogs.events({

'click .blogcomment':function()
{
var blogId=this._id;

Session.set('BlogId',blogId);

}



});



//...........................................................Template.blogComment events.........................................................................................



Template.blogComment.events({

'submit form': function(event)

{

event.preventDefault();

var blogId=Session.get('BlogId');
var commentContent=event.target.commentcontent.value;

Meteor.call('blogCommentMethod',commentContent,blogId);



event.target.commentcontent.value = "";
 

},

'click .viewOtherProfile':function()

{

var userId=this.UserId;

Session.set('UserId',userId);



}



});





Meteor.subscribe('postQuery');
Meteor.subscribe('postComment');
Meteor.subscribe('updateHost');
Meteor.subscribe('updateGuest');
Meteor.subscribe('userInfo');
Meteor.subscribe('userInbox');
Meteor.subscribe('ChatBox');
Meteor.subscribe('BlogBox');
Meteor.subscribe('BlogComments');
}







if(Meteor.isServer)
{
Meteor.publish('postQuery',function()
{
return PostList.find();

}

);

Meteor.publish('postComment',function()
{
return CommentList.find();

}

);

Meteor.publish('updateHost',function()
{
return HostList.find();

}

);

Meteor.publish('updateGuest',function()
{
return GuestList.find();

}

);
Meteor.publish('userInfo',function()
{
return UserInfo.find();

}

);

Meteor.publish('userInbox',function()
{
return UserInbox.find();

}

);

Meteor.publish('ChatBox',function()
{
return ChatBox.find();

}

);

Meteor.publish('BlogBox',function()
{
return BlogBox.find();

}

);

Meteor.publish('BlogComments',function()
{
return BlogComments.find();

}

);

}



//.................................................................Meteor.methods.........................................................................................






Meteor.methods
({

//.................................................................post method.........................................................................................


'postMethod': function(postContent,currentUserEmail)
{

var UserId=Meteor.userId();
PostList.insert({

post:postContent,
createdAt: new Date(),
createdBy:currentUserEmail,
UserId:UserId

});


},


//.................................................................comment method.........................................................................................



'commentMethod': function(commentContent,currentUserEmail,postId)
{

var UserId=Meteor.userId();
CommentList.insert({

comment:commentContent,
createdAt: new Date(),
createdBy:currentUserEmail,
postId:postId,
UserId:UserId
});


},




//.................................................................createHost method.........................................................................................



'createHost':function(fullName,address,street,country,state,postCode,mobile,email,hostLocation,hostType,preference)
{
 check(fullName, String);
 
var UserId=Meteor.userId();
var HostLoc= hostLocation.toUpperCase();
HostList.insert({

Name:fullName,
Address:address,
Street:street,
Country:country,
State:state,
Post:postCode,
Mobile:mobile,
Email:email,
HostLoc:HostLoc,
HostType:hostType,
Preference:preference,
createdAt: new Date(),
UserId:UserId


});


},



//.................................................................deletePost method.........................................................................................



'deletePost':function(postId)
{

var UserId=Meteor.userId();

if(UserId){

        PostList.remove( { _id: postId, UserId: UserId });
        CommentList.remove( { postId: postId, UserId: UserId });

        }





},



//.................................................................deleteBlog method.........................................................................................



'deleteBlog':function(blogId)
{

var UserId=Meteor.userId();

if(UserId){

        BlogBox.remove( { _id: blogId, UserId: UserId });

        }





},



//.................................................................deleteComment method.........................................................................................



'deleteComment':function(commentId)
{

var UserId=Meteor.userId();

if(UserId){

        CommentList.remove( { _id: commentId, UserId: UserId });

        }





},



//.................................................................updateHost method.........................................................................................



'updateHost':function(fullName,address,street,country,state,postCode,mobile,email,hostLocation,hostType,preference,hostId)
{
 check(fullName, String);
 
var UserId=Meteor.userId();

var HostLoc= hostLocation.toUpperCase();
if(UserId){

        HostList.update( { _id: hostId, UserId: UserId },
                                { Name:fullName,
                                 Address:address,
                                 Street:street,
                                 Country:country,
                                 State:state,
                                 Post:postCode,
                                 Mobile:mobile,
                                 Email:email,
                                 HostLoc:HostLoc,
                                 HostType:hostType,
                                 Preference:preference,
                                 createdAt: new Date(),
                                 UserId:UserId});
        }

},



//.................................................................createGuest method.........................................................................................



'createGuest':function(fullName,address,street,country,state,postCode,mobile,email,hostLocation,hostType,count,preference)
{
 check(fullName, String);
 
var UserId=Meteor.userId();
var HostLoc= hostLocation.toUpperCase();

GuestList.insert({

Name:fullName,
Address:address,
Street:street,
Country:country,
State:state,
Post:postCode,
Mobile:mobile,
Email:email,
HostLoc:HostLoc,
HostType:hostType,
Count:count,
Preference:preference,
createdAt: new Date(),
UserId:UserId


});


},


//.................................................................updateGuest method.........................................................................................


'updateGuest':function(fullName,address,street,country,state,postCode,mobile,email,hostLocation,hostType,count,preference,guestId)
{
 check(fullName, String);
 
var UserId=Meteor.userId();
var HostLoc= hostLocation.toUpperCase();


if(UserId){

        GuestList.update( { _id: guestId, UserId: UserId },
                                { Name:fullName,
                                 Address:address,
                                 Street:street,
                                 Country:country,
                                 State:state,
                                 Post:postCode,
                                 Mobile:mobile,
                                 Email:email,
                                 HostLoc:HostLoc,
                                 HostType:hostType,
                                 Count:count,
                                 Preference:preference,
                                 createdAt: new Date(),
                                 UserId:UserId});
        }

},




//.................................................................createProfile method.........................................................................................




'createProfile':function(firstName,lastName,address,street,country,state,postCode,mobile,email,status,result)

{
var UserId=Meteor.userId();
if(UserId){
                  UserInfo.insert({firstName:firstName,
                                  lastName:lastName,
                                 Address:address,
                                 Street:street,
                                 Country:country,
                                 State:state,
                                 Post:postCode,
                                 Mobile:mobile,
                                 Email:email,
                                 Status:status,
                                 ProfilePic:result,
                                 createdAt: new Date(),
                                 UserId:UserId});


                    UserInbox.insert({


                             Message:"Welcome to your PathBuddy Inbox",
                              ReceiverId:UserId,
                             TimeStamp:new Date()

                                  }


                                 );



          }



},




//.................................................................updateProfile method.........................................................................................



'updateProfile':function(firstName,lastName,address,street,country,state,postCode,mobile,email,status,result)

{

var UserId=Meteor.userId();

if(UserId){

        UserInfo.update( { UserId: UserId },
                              { $set:{ firstName:firstName,
                                  lastName:lastName,
                                 Address:address,
                                 Street:street,
                                 Country:country,
                                 State:state,
                                 Post:postCode,
                                 Mobile:mobile,
                                 Email:email,
                                 Status:status,
                                 ProfilePic:result,
                                 createdAt: new Date(),
                                 UserId:UserId}});
        }




},




//.................................................................updateStatus method.........................................................................................



'updateStatus':function(status,customerInfoId)
{
var UserId=Meteor.userId();

if(UserId){
           UserInfo.update({_id:customerInfoId,UserId:UserId },

                           { $set:{Status:status}});

           }

},



//.................................................................updateProfilePic method.........................................................................................



'updateProfilePic':function(result,customerInfoId)
{
var UserId=Meteor.userId();

if(UserId){
           UserInfo.update({_id:customerInfoId,UserId:UserId },

                           { $set:{ProfilePic:result}});

           }

},




//.................................................................Sendmessage method.........................................................................................



'SendMessage':function(message,receiverId)
{
var UserId=Meteor.userId();

if(UserId){
           
             UserInbox.insert({


                             Message:message,
                             SenderId:UserId,
                             ReceiverId:receiverId,
                             TimeStamp:new Date()

                                  }


                                 );
           
          UserInfo.update({UserId:receiverId},

                           { $set:{NewMessages:'true'}});



           }

},



//..............................................................updateMessageStatus method.........................................................................................



'UpdateMessageStatus':function()

{
var UserId=Meteor.userId();

if(UserId){
           
                       
          UserInfo.update({UserId:UserId},

                           { $set:{NewMessages:'false'}});



           }

},



//.................................................................SendChat method.........................................................................................



'SendChat':function(message,buddyId)
{
var UserId=Meteor.userId();

if(UserId){
           
             ChatBox.insert({


                             Message:message,
                             SenderId:UserId,
                             ReceiverId:buddyId,
                             TimeStamp:new Date()

                                  }


                                 );
           
          UserInfo.update({UserId:buddyId},

                           { $set:{NewChatMessages:'true'}});



           }

},




//........................................................UpdateChatMessageStatus method.........................................................................................


'UpdateChatMessageStatus':function()

{
var UserId=Meteor.userId();

if(UserId){
           
                       
          UserInfo.update({UserId:UserId},

                           { $set:{NewChatMessages:'false'}});



           }

},



//.................................................................insertBlog method.........................................................................................



'insertBlog':function(heading,blog,firstName,lastName,email)

{

var UserId=Meteor.userId();
var Heading= heading.toUpperCase();


                   BlogBox.insert({
                                   Heading:Heading,
                                   Blog:blog,
                                   firstName:firstName,
                                  lastName:lastName,
                                   Email:email,
                                   createdAt: new Date(),
                                   UserId:UserId
                              });



       



},

'blogCommentMethod': function(commentContent,blogId)
{

var UserId=Meteor.userId();
BlogComments.insert({

comment:commentContent,
createdAt: new Date(),

blogId: blogId,
UserId:UserId
});


},




});