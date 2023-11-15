import React from "react";
import {RequestState} from "../../RequestState";

interface SocialLinkProps {
  state: RequestState;
  onClick: () => void;
}

export const ActionButton: React.FC<SocialLinkProps> = (props) => {

  return (
    <div className="row">
      <div className="col-md-12">
        <button type="button"
                className="btn btn-primary btn-h-60 text-white min-width-px-210 rounded-5 text-uppercase"
                onClick={props.onClick}
                disabled={props.state === RequestState.LOADING}
                style={{background: '#7c54f9', transition: 'opacity 0.5s ease'}}>
          <span>{props.state === RequestState.LOADING &&
          <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>
          }&nbsp;&nbsp;{props.children}&nbsp;&nbsp;{props.state === RequestState.LOADING &&
          <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" style={{visibility: "hidden"}}/>
          }</span>
        </button>
      </div>
    </div>
  );
};
