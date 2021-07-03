import React from "react";

const data = [
    { id: 1, author: "Daniel Lo Nigro", text: "Hello ReactJS.NET World!" },
    { id: 2, author: "Pete Hunt", text: "This is one comment" },
    { id: 3, author: "Jordan Walke", text: "This is *another* comment" },
];

export function CommentBox() {
    return (
        <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={data} />
            <CommentForm />
        </div>
    );
}

function CommentList(props) {
    return (
        <div>
            {props.data.map((comment) => (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            ))}
        </div>
    );
}

function CommentForm() {
    return <div className="commentForm">Hello, world! I am a CommentForm.</div>;
}

// if passing in props to a class, use "this.props.name..."
// if passing to function, "use props.name..."
function Comment(props) {
    const { author } = props;
    return (
        <div className="comment">
            <h3 className="commentAuthor">{author}</h3>
            {props.children}
        </div>
    );
}
