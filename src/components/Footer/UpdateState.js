import { changeStorage } from "../Main/Storage/StorageItems";


function sort () {
    return Math.random() - 0.5;
}

function update_time ({ newStatus, status, value }) {
    newStatus.time = status.time + value;
}

function update_written ({ newStatus, status, value }) {
    const sortNumber = sort();

    newStatus.written = status.written + value;

    if ((newStatus.written % 100 === 0) && (sortNumber > 0)) {
        newStatus.hungry = status.hungry + 1;
    }

    if ((status.written - status.physical) >= 100) {

        if ((status.mental > 20) && (status.written % 3 === 0)) {
            newStatus.mental = status.mental - 1;
        }
    } else if ((status.mental < 80) && (status.written % 10 === 0)) {
        newStatus.mental = status.mental + 1
    }
}

function update_hungry ({ newStatus, status, value }) {
    if ((status.hungry + value) <= 0) {
        value = 0 - status.hungry;
    } else if (status.hungry <= 7) {
        value = -4;
    } else {
        value = -3;
    }

    newStatus.hungry = status.hungry + value;

    if (value !== 0) {
        if (status.mental < 80) {
            newStatus.mental = status.mental + 1;
        }
        
        changeStorage({ change:{ id:1, value:value } });
    }
}

function update_physical ({ newStatus, status, value }) {
    const sortNumber = sort();

    newStatus.physical = status.physical + value;

    if ((newStatus.physical % 50 === 0) && (sortNumber > 0)) {
        newStatus.hungry = status.hungry + 1;
    }

    if ((status.physical - status.written) >= 100) {
        
        if ((status.mental > 20) && (status.physical % 3 === 0)) {
            newStatus.mental = status.mental - 1
        }
    } else if ((status.mental < 80) && (status.physical % 10 === 0)) {
        newStatus.mental = status.mental + 1
    }
}

function update_mental ({ newStatus, status, value }) {
    newStatus.mental = status.mental + value;
}

const functions = {
    update_time,
    update_written,
    update_hungry,
    update_physical,
    update_mental
}

function UpdateState ({ states, status, setStatus }) {

    const newStatus = {};

    for (let i = 0; i < states.length; i++) {
        const functionName = `update_${states[i].state}`;
        let value = states[i].value;
        
        functions[functionName]({ newStatus, status, value });
    }

    setStatus({
        ...status,
       ...newStatus
    });
}

export default UpdateState;