const BLANK_SPACE = '_'
const X_CHAR = 'x'
const A_CHAR = 'a'
const B_CHAR = 'b'

const LEAVE_INNER_BLANKS = false

function tmComputation(w) {

    // TMs have blank spaces on the tape after the input
    // so, we append some blank spaces here to simulate that
    for (let i = 0; i < 10; ++i)
        w += BLANK_SPACE

    // we will simualate tape head by using the string index
    let tapeHead = 0

    // tape head movement simulations
    const tapeHeadLeft = _ => --tapeHead
    const tapeHeadRight = _ => ++tapeHead

    // tape head writing simulation
    const writeAtTapeHead = (char) => w = w.slice(0, tapeHead) + char + w.slice(tapeHead + 1, w.length)

    // read tape head
    const readTapeHead = _ => { return w[tapeHead] }

    // log tm machine state
    const logTMState = _ => {
        if (LEAVE_INNER_BLANKS)
            console.log(`tape=${w.replace(/^_*|_*$/g, '')}\ttapeHead=${tapeHead}`)
        else
            console.log(`tape=${w.replace(/_/g, '')}\ttapeHead=${tapeHead}`)
    }

    const moveToEnd = () => {
        while (true) {
            if (readTapeHead() == A_CHAR || readTapeHead() == B_CHAR) {
                tapeHeadRight()
                logTMState()
            }
            else if (readTapeHead() == BLANK_SPACE) {
                break
            }
        }
    }

    const nGood = () => {
        moveToEnd()

        tapeHeadLeft()
        logTMState()

        while (true) {
            if (readTapeHead() == A_CHAR || readTapeHead() == B_CHAR) {
                writeAtTapeHead(X_CHAR)
                tapeHeadLeft()
                logTMState()
            }
            else if (readTapeHead() == X_CHAR) {
                writeAtTapeHead(A_CHAR)
                tapeHeadRight()
                logTMState()
                
                writeAtTapeHead(B_CHAR)
                tapeHeadRight()
                logTMState()

                while (true) {
                    if (readTapeHead() == BLANK_SPACE)
                        return 'halt'
                    else {
                        writeAtTapeHead(BLANK_SPACE)
                        tapeHeadRight()
                        logTMState()
                    }
                }
            }
        }
    }

    const nBad = () => {
        moveToEnd()

        tapeHeadLeft()
        logTMState()

        while (true) {
            if (readTapeHead() == A_CHAR || readTapeHead() == B_CHAR) {
                writeAtTapeHead(X_CHAR)
                tapeHeadLeft()
                logTMState()
            }
            else if (readTapeHead() == X_CHAR) {
                writeAtTapeHead(A_CHAR)
                tapeHeadRight()
                logTMState()

                writeAtTapeHead(A_CHAR)
                tapeHeadRight()
                logTMState()

                while (true) {
                    if (readTapeHead() == BLANK_SPACE)
                        return 'halt'
                    else {
                        writeAtTapeHead(BLANK_SPACE)
                        tapeHeadRight()
                        logTMState()
                    }
                }
            }
        }
    }


    // -----------------------------------------
    // run simulation for TM computing function
    // -----------------------------------------

    logTMState()

    // if tape is blank, write ab and halt
    if (readTapeHead() == BLANK_SPACE){
        writeAtTapeHead(A_CHAR)
        tapeHeadRight()
        logTMState()

        writeAtTapeHead(B_CHAR)
        tapeHeadRight()
        logTMState()

        return 'halt'
    }
    // if 'a' or 'b' move tape head right
    else if (readTapeHead() == A_CHAR || readTapeHead() == B_CHAR) {
        writeAtTapeHead(X_CHAR)
        tapeHeadRight()
        logTMState()
    }

    // if 'a' or 'b' move tape head right
    if (readTapeHead() == A_CHAR || readTapeHead() == B_CHAR)
        tapeHeadRight()
    // if blank char, make sure tape is 'aa' then halt
    else if (readTapeHead() == BLANK_SPACE) {
        return nBad()
    }

    while (true) {

        logTMState()

        // read char on tape at tape head
        // if blank space, make sure tape is 'ab' then halt
        if (readTapeHead() == BLANK_SPACE)
            return nGood()
        // if 'a' or 'b' move tape head right
        else if (readTapeHead() == A_CHAR || readTapeHead() == B_CHAR)
            tapeHeadRight()

        logTMState()

        // read char on tape at tape head
        // if 'a' or 'b' move tape head right
        if (readTapeHead() == A_CHAR || readTapeHead() == B_CHAR) {
            tapeHeadRight()
            logTMState()
        }
        // if blank space, make sure tape is 'aa' then halt
        else if (readTapeHead() == BLANK_SPACE) {
            return nBad()
        }
    }
}

console.log(tmComputation(''))
console.log()
console.log(tmComputation('aaaaaa'))
console.log(tmComputation('b'))
console.log(tmComputation('aabbaaaa'))
console.log(tmComputation('bb'))