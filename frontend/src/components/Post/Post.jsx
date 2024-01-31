const Post = (props) => {
  var formattedDate = new Date(props.post.timestamp).toLocaleString()


  return (
    <div key={props.post._id} className="flex justify-center mt-6">
      <div className="w-1/2 text-justify border border-gray-200 rounded-md pt-2 p-4">
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

        <p className="mt-2 text-sm text-black">
          {props.post.message}
        </p>
      </div>
    </div>)
    ;
};

export default Post;
