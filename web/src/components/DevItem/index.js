import React from "react";
//import FontAwesomeIcon from 'react-fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";

import "./styles.css";

function DevItem({ dev }) {
  async function handleDestroy(github_username) {
    //console.log(github_username);
    await api.post('/DevDes',{
        github_username,
    })
    //console.log(response.data);
  }
  return (
    <li className="dev-item">
      <header>
        <div className="user-avatar">
            <img src={`${dev.avatar_url}`} alt={`${dev.name}`} />
        </div>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(", ")}</span>
        </div>
        <div className="user-action">
          <FontAwesomeIcon icon={faTrash} onClick={() => handleDestroy(dev.github_username)} />
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no github
      </a>
    </li>
  );
}

export default DevItem;
