import React, {useState} from 'react';

export default () => {
  const [nameList, setNames] = useState(['Joe', 'Andy', 'Stew', 'Salma', 'Layla']);
  const [assignedList, setAssigned] = useState({});

  const setNameList = (e) => {
    e.preventDefault()
    setNames([...nameList, e.target.name.value])
    e.target.name.value = ''
  }

  const randomizePeople = (names) => {
    const copyNames = [...names]

    copyNames.forEach((name, index) => {
      const randomIndex = Math.floor(Math.random() * copyNames.length)
      copyNames[index] = copyNames[randomIndex]
      copyNames[randomIndex] = name
    })

    return copyNames
  }

  const assignPeople = () => {
    let names = randomizePeople(nameList)

    const giversMap = {};
    names.forEach((name, i, array) => {
      if (i === array.length - 1) {
        giversMap[name] = array[0];
        return;
      }
      giversMap[name] = array[i + 1];
    });

    setAssigned(giversMap);
  }

  return (
    <div className="secret-santa">
      <h1 className="secret-santa__title">
        Secret Santa
      </h1>
      <form onSubmit={setNameList} className="secret-santa__input">
        <input name="name" className="secret-santa__input-field"/>
        <button className="secret-santa__btn">
          Add name
        </button>
      </form>
      <ul className="secret-santa__name-list">
        {nameList.map((name, index) =>
        <li
          key={name + index}
          className="secret-santa__participant participant"
        >
          {name} {
            assignedList[name] && '=> ' + assignedList[name]
          }
        </li>
        )}
      </ul>
      {
        nameList.length > 0 &&
        <button onClick={assignPeople} className="secret-santa__btn">
          Assign
        </button>
      }
    </div>
  )
}
