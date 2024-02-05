import Like from "./Like";

const Post = (props) => {
  const formattedDate = new Date(props.post.createdAt).toLocaleString();
  let comments = 0;
  return (
    <div role="singlePost" key={props.post._id} className="flex justify-center mt-6">
      <div className="w-1/2 bg-white shadow text-justify border border-gray-200">
        <div className="pt-2 p-4">
          <div className="flex flex-row">
            <div className="p-4 border rounded-full">
              Pic
            </div>
            <div className="flex flex-col justify-center ms-4">
              <div className="text-sky-500 text-base font-bold">
                {props.post.user_data[0].username} ({props.post.user_data[0].firstName} {props.post.user_data[0].lastName})
              </div>
              <div className="mt-1 text-xs text-neutral-500">
                {formattedDate}
              </div>
            </div>
          </div>
          <p role="singlePostContent" className="mt-2 text-sm text-black">
            {props.post.message}
          </p>
        </div>


        <div className="grid grid-cols-2 grid-rows-1 border-t px-4 py-2 text-xs text-neutral-500">
          <Like post_id={props.post._id} likes={props.post.likes} userID={props.userID} token={props.token} setToken={props.setToken}/>
          
          <div className="flex justify-end items-center align-middle">
            <span className="me-2">{comments}</span>
            <span>Comments</span>
          </div>
        </div>

      </div>
    </div>);
};

export default Post;
