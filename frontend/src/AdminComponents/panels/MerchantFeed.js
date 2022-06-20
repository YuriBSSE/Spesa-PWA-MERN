import React from 'react';


class MerchantFeed extends React.Component {

    render(){
        return(
            <>
            {this.props.feed.map((feed, index) => (
                <div key={index} className="feed-item feedDiv">
                    <p style={{margin:0}}>{feed.feedback}</p>
                </div>
            ))}
            </>
        )
    }
}

export default MerchantFeed;