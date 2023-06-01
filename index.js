const BLANK_SPACE = '_'
const X_CHAR = 'x'
const A_CHAR = 'a'
const B_CHAR = 'b'

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
    const logTMState = _ => console.log(`tape=${w.replace(/_/g, '')}\ttapeHead=${tapeHead}`)

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

    const inBHalt = () => {
        tapeHeadLeft()
        logTMState()

        while (true) {
            if (readTapeHead() == A_CHAR || readTapeHead() == B_CHAR) {
                writeAtTapeHead(X_CHAR)
                tapeHeadLeft()
                logTMState()
            }
            else if (readTapeHead() == X_CHAR) {
                return writeAB()
            }
        }
    }

    const notInBHalt = () => {
        tapeHeadLeft()
        logTMState()

        while (true) {
            if (readTapeHead() == A_CHAR || readTapeHead() == B_CHAR) {
                writeAtTapeHead(X_CHAR)
                tapeHeadLeft()
                logTMState()
            }
            else if (readTapeHead() == X_CHAR) {
                return writeAA()
            }
        }
    }

    const writeAA = () => {
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

    const writeAB = () => {
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


    // run simulation for TM computing function
    logTMState()

    // if blank space, make sure tape is 'ab' then halt
    if (readTapeHead() == BLANK_SPACE)
        return writeAB()
    // if 'a' move tape head right
    else if (readTapeHead() == A_CHAR) {
        writeAtTapeHead(X_CHAR)
        tapeHeadRight()
    }
    // if any character other than blank, make sure tape is 'aa' then halt
    else {
        writeAtTapeHead(X_CHAR)
        tapeHeadRight()
        moveToEnd()
        return notInBHalt()
    }

    logTMState()

    // read char on tape at tape head
    // if 'a' move tape head right
    if (readTapeHead() == A_CHAR)
        tapeHeadRight()
    // if any character other than 'a', make sure tape is 'aa' then halt
    else {
        moveToEnd()
        return notInBHalt()
    }

    while (true) {

        logTMState()

        // read char on tape at tape head
        // if blank space, make sure tape is 'ab' then halt
        if (readTapeHead() == BLANK_SPACE)
            return inBHalt()
        // if 'a' move tape head right
        else if (readTapeHead() == A_CHAR)
            tapeHeadRight()
        // if any character other than blank or 'a', make sure tape is 'aa' then halt
        else {
            moveToEnd()
            return notInBHalt()
        }

        logTMState()

        // read char on tape at tape head
        // if 'a' move tape head right
        if (readTapeHead() == A_CHAR)
            tapeHeadRight()
        // if any character other than 'a', make sure tape is 'aa' then halt
        else {
            moveToEnd()
            return notInBHalt()
        }
    }
}

console.log(tmComputation('aaaa'))
console.log()
console.log(tmComputation(''))