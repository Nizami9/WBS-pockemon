import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  attack,
  checkVictory
} from '../../utils/attacksType';
import './fights.css';
import CardFight from './CardFight';
import Col from 'react-bootstrap/Col';
import Won from '../Won/Won';
import Lose from '../Won/Lose';
import Spinner from 'react-bootstrap/Spinner';

export default function Fights() {
  const history = useHistory();
  const { name } = useParams();
  const [pokemon, setPokemon] = useState();
  const [lucky, setLucky] = useState();
  const [won, setWon] = useState({ check: false, winner: null });
  const [lose, setLose] = useState({ check: false, winner: null, draw: false });
  const [loader, setLoader] = useState();

  useEffect(() => {
    if (pokemon && lucky) {
      const winner = checkVictory(pokemon, lucky);
      switch (winner) {
        case 1:
          setWon({ check: true, winner: pokemon.data.name });
          break;
        case 2:
          setLose({ check: true, winner: pokemon.data.name, draw: false });
          break;
        case 0:
          setLose({ check: true, winner: pokemon.data.name, draw: true });
          break;
        default:
          break;
      }
    }
  }, [pokemon, lucky]);

  useEffect(() => {
    setLoader(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon({
          data: data,
          player: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            specialAttack: data.stats[3].base_stat,
            specialDefense: data.stats[4].base_stat,
          },
        });
      })
      .catch((e) => console.log(e.message));
  }, [name]);

  useEffect(() => {
    setLoader(true);
    const luckyNum = Math.floor(Math.random() * 1100);
    fetch(`https://pokeapi.co/api/v2/pokemon/${luckyNum}`)
      .then((res) => res.json())
      .then((data) => {
        setLucky({
          data: data,
          player: {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            specialAttack: data.stats[3].base_stat,
            specialDefense: data.stats[4].base_stat,
          },
        });
        setLoader(false);
      })
      .catch((e) => console.log(e.message));
  }, []);

  const handleClickAttack = () => {
    setLucky((prevState) => ({
      ...prevState,
      player: {
        ...prevState.player,
        hp: attack(pokemon, prevState),
      },
    }));
    // Attack from opponent
    setPokemon((prevState) => ({
      ...prevState,
      player: {
        ...prevState.player,
        hp: attack(lucky, prevState),
      },
    }));
  };

  const handleClickWon = () => {
    history.push('/');
  };

  return (
    <>
      {won.check && <Won {...won} onClickWon={handleClickWon} />}
      {lose.check && <Lose {...lose} onClickWon={handleClickWon} />}
      <Col className="d-flex flex-column align-items-start flex-md-row flex-md-wrap justify-content-center">
        {loader && <Spinner size="lg" variant="danger" animation="grow" />}
        {pokemon && lucky && (
          <CardFight
            {...pokemon}
            onClickAttack={handleClickAttack}
          />
        )}
        {pokemon && lucky && <CardFight {...lucky} opponent />}
      </Col>
    </>
  );
}
