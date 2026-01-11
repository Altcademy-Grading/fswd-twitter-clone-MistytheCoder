import React, { useEffect, useState } from "react";

const Feed = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetch("/tweets")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched tweets:", data);
        setTweets(data);
      });
  }, []);

  return (
    <div>
      <h2>Latest Tweets</h2>
      {tweets.map(tweet => (
        <div key={tweet.id}>
          <strong>@{tweet.username}</strong>: {tweet.message}
        </div>
      ))}
    </div>
  );
};

export default Feed;
