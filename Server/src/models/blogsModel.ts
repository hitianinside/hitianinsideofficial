import mongoose, { Document, Schema } from "mongoose";

export interface BlogType extends
  Document {
  title: string,
  slug: string,
  content: string,
  excerpt?: string,
  status: string,
  totalVisits: number,
  social_media_link: string
}

const blogSchema = new Schema<BlogType>({
   title : {
     type : String,
     trim : true,
     required : true
   },

   slug : {
     type : String,
     trim : true,
   },

   content : {
     type : String,
     trim : true,
     required : true,
   },

   excerpt : {
     type : String,
     trim : true
   },

   status : {
    type : String,
    default : "draft"
   },

   totalVisits : {
    type : Number,
    default : 0
   },

   social_media_link : {
     type : String,
     required : true
   }
}, { timestamps: true });

const Blogs = mongoose.model<BlogType>("Blogs", blogSchema);

export default Blogs;