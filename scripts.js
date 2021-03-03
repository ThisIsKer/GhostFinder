function getGhostsCluesMap() {
    return [
        {id: "Spirit", clues: ["Spirit Box", "Ghost Writing", "Fingerprints"]},
        {id: "Poltergeist", clues: ["Orbs", "Spirit Box", "Fingerprints"]},
        {id: "Jinn", clues: ["EMF", "Orbs", "Spirit Box"]},
        {id: "Revenant", clues: ["EMF", "Ghost Writing", "Fingerprints"]},
        {id: "Shade", clues: ["EMF", "Orbs", "Ghost Writing"]},
        {id: "Oni", clues: ["EMF", "Spirit Box", "Ghost Writing"]},
        {id: "Wraith", clues: ["Freezing", "Spirit Box", "Fingerprints"]},
        {id: "Phantom", clues: ["Freezing", "EMF", "Orbs"]},
        {id: "Banshee", clues: ["Freezing", "EMF", "Fingerprints"]},
        {id: "Mare", clues: ["Freezing", "Spirit Box", "Orbs"]},
        {id: "Demon", clues: ["Freezing", "Spirit Box", "Ghost Writing"]},
        {id: "Yurei", clues: ["Freezing", "Ghost Writing", "Orbs"]}
    ];
}

function getGhostsBehavioursMap() {
    return [
        {id: "Spirit", behaviour: "Smudge sticks prevent hunt for 180 seconds instead of 90 seconds"},
        {id: "Poltergeist", behaviour: "Often throw objects and interact with surroundings; less active in empty rooms"},
        {id: "Jinn", behaviour: "Frequently interacts with lights, car, TV and radio; if power breaker is on, goes twice as fast while hunting"},
        {id: "Revenant", behaviour: "Moves faster than other ghosts"},
        {id: "Shade", behaviour: "Hunts and interacts more frequently while grouped"},
        {id: "Oni", behaviour: "Non-freezing temperature without noticeable pattern behaviour"},
        {id: "Wraith", behaviour: "Doesn't leave UV footprints on salt; contact with salt increases activity"},
        {id: "Phantom", behaviour: "Disappears when photographed, resulting in a ghost picture without the ghost; don't appear frequently during the hunt"},
        {id: "Banshee", behaviour: "Attacks in spite of the sanity"},
        {id: "Mare", behaviour: "Often turns off both the lights and the power breaker"},
        {id: "Demon", behaviour: "Asking the right questions on the Ouija Board won't lower your sanity"},
        {id: "Yurei", behaviour: "Sanity drops at a 14% rate instead of 7% while being in an empty room"}
    ];
}

function getCompleteGhostsList() {
    return getGhostsCluesMap().map(function (ghostClue) {
        return ghostClue.id;
    });
}

function getCompleteCluesList() {
    return ["Freezing", "EMF", "Spirit Box", "Ghost Writing", "Fingerprints", "Orbs"];
}

function getCompleteBehavioursList() {
    return getGhostsBehavioursMap().map(function (ghostBehaviour) {
        return ghostBehaviour.behaviour;
    });
}

function hasSubArray(master, sub) {
    return sub.every((i => v => i = master.indexOf(v, i) + 1)(0));
}

function getFilteredGhostsList(clues, removedClues) {
    return getGhostsCluesMap().filter(function (ghostClue) {
        if(clues.length > 0 && removedClues.length > 0){
            return hasSubArray(ghostClue.clues, clues) && !hasSubArray(ghostClue.clues, removedClues);
        } else if(clues.length > 0) {
            return hasSubArray(ghostClue.clues, clues);
        } else if(removedClues.length > 0) {
            return !hasSubArray(ghostClue.clues, removedClues);
        } else {
            return true;
        }
    }).map(function (ghost) {
        return ghost.id;
    });;
}

function getFilteredBehavioursList(ghostsList) {
    return getGhostsBehavioursMap().filter(function(ghostBehaviour) {
        return ghostsList.includes(ghostBehaviour.id);
    }).map(function(ghostBehaviour) {
        return ghostBehaviour.behaviour;
    });
}

function loadList(list, listElement) {
    var listItem;
    list.forEach(function(item) {
        listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerText = item;
        listElement.appendChild(listItem);
    });
}

function enrichCluesList() {
    var cluesDiv = document.getElementById("cluesList");
    cluesDiv.childNodes.forEach(function(clue) {
        clue.addEventListener('click', handleClueClick);
    });
}

function enrichBehavioursList() {
    var behavioursDiv = document.getElementById("behavioursList");
    behavioursDiv.childNodes.forEach(function(behaviour) {
        behaviour.addEventListener('click', handleBehaviourClick);
    });
}

function changeColor(that) {
    switch (that.style.color){
        case "":
            that.style.color = "green";
            break;
        case "green":
            that.style.color = "red";
            break;
        case "red":
            that.style.color = "";
            break;
    }
}

function handleClueClick() {
    changeColor(this);
    updateGhostsList();
}

function handleBehaviourClick() {
    changeBehaviourColor(this);
    highlightCluesAndGhostIfPresent();
}

function changeBehaviourColor(that) {
    that.style.color == "" ? that.style.color = "blue" : that.style.color = "";
}

function highlightCluesAndGhostIfPresent() {
    var selectedBehaviours = [];
    var ghostsToBeHighlighted = [];
    var cluesToBeHighlighted = [];
    document.getElementById("behavioursList").childNodes.forEach(
        function(behaviour) {
            if(behaviour.style && behaviour.style.color == "blue"){
                selectedBehaviours.push(behaviour.innerText);
            }
        }
    );
    ghostsToBeHighlighted = getGhostsBehavioursMap().filter(function(ghostBehaviour) {
        return selectedBehaviours.includes(ghostBehaviour.behaviour);
    }).map(function(ghost) {
        return ghost.id;
    });
    document.getElementById("ghostsList").childNodes.forEach(function(child) {
        if(child.style) {
            child.style.border = "";
        }
    });
    document.getElementById("ghostsList").childNodes.forEach(function(child) {
        if(child.style && ghostsToBeHighlighted.includes(child.innerText)) {
            child.style.border = "thick solid #0000FF";
        }
    });
    cluesToBeHighlighted = getGhostsCluesMap().filter(function(ghostClue) {
        return ghostsToBeHighlighted.includes(ghostClue.id);
    }).map(function(ghost) {
        return ghost.clues;
    });
    document.getElementById("cluesList").childNodes.forEach(function(child){
        if(child.style) {
            child.style.border = "";
        }
    })
    cluesToBeHighlighted.forEach(function (cluesList) {
        cluesList.forEach(function(clues) {
            document.getElementById("cluesList").childNodes.forEach(function(child){
                if(child.style && clues.includes(child.innerText)) {
                    child.style.border = "thick solid #0000FF";
                }
            })
        })
    });
}

function loadLists() {
    loadList(getCompleteGhostsList(), document.getElementById("ghostsList"));
    loadList(getCompleteCluesList(), document.getElementById("cluesList"));
    loadList(getCompleteBehavioursList(), document.getElementById("behavioursList"));
}

function clearGhostsList() {
    document.getElementById("ghostsList").innerHTML = "";
}

function clearBehavioursList() {
    document.getElementById("behavioursList").innerHTML = "";
}

function clueFilter(color) {
    var clues = document.getElementById("cluesList");
    var selectedClues = [];
    clues.childNodes.forEach(function(child) {
        if(child.style && child.style.color == color){
            selectedClues.push(child.innerText);
        }
    });
    return selectedClues;
}

function getSelectedClues() {
    return clueFilter("green");
}

function getRemovedClues() {
    return clueFilter("red");
}

function updateGhostsList() {
    clearGhostsList();
    var filteredGhostsList = getFilteredGhostsList(getSelectedClues(), getRemovedClues());
    loadList(filteredGhostsList, document.getElementById("ghostsList"));
    updateBehavioursList();
    enrichGhostsList();
}

function updateBehavioursList() {
    clearBehavioursList();
    loadList(getFilteredBehavioursList(getFilteredGhostsList(getSelectedClues(), getRemovedClues())), document.getElementById("behavioursList"));
    enrichBehavioursList();
    highlightCluesAndGhostIfPresent();
}

function enrichGhostsList() {
    document.getElementById("ghostsList").childNodes.forEach(function(child) {
        child.addEventListener("mouseenter", highlightGhostsAndCluesOnEnter)
        child.addEventListener("mouseout", highlightGhostsAndCluesOnOut)
    });
}

function highlightGhostsAndCluesOnEnter() {
    var cluesToHighlight = [];
    var ghostName = this.innerText;
    this.style.background = "yellow";
    cluesToHighlight = getGhostsCluesMap().filter(function(ghostClues) {
        return ghostClues.id == ghostName;
    }).map(function(ghostClues) {
        return ghostClues.clues;
    });
    document.getElementById("cluesList").childNodes.forEach(function(child) {
        if(child.style && cluesToHighlight[0].includes(child.innerText)){
            child.style.background = "yellow";
        }
    })
}

function highlightGhostsAndCluesOnOut() {
    var cluesToHighlight = [];
    var ghostName = this.innerText;
    this.style.background = "white";
    cluesToHighlight = getGhostsCluesMap().filter(function(ghostClues) {
        return ghostClues.id == ghostName;
    }).map(function(ghostClues) {
        return ghostClues.clues;
    });
    document.getElementById("cluesList").childNodes.forEach(function(child) {
        if(child.style && cluesToHighlight[0].includes(child.innerText)){
            child.style.background = "white"
        }
    })
}

function loadCore() {
    loadLists();
    enrichCluesList();
    enrichBehavioursList();
    enrichGhostsList();
}

