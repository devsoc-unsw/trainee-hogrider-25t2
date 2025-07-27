// Mary code here!!!
"use client";

import styles from "./temp-style.module.css";

export default function Result() {
  return (
    <div className={styles.pageContainer}>
      {/* temp navbar */}
      <nav className={styles.navBar}>
        <h1 className="text-white font-bold text-xl">I'M LATE!</h1>
      </nav>

      {/* ai-generated excuse */}
      <main className={styles.parentResponse}>
        <div className={styles.sorryChild}>
          <p className={styles.sorryText}>
            <span>SORRY</span>
            <br />
            <span className={styles.leftShift}>GUYS...!</span>
          </p>
        </div>

        <div className={styles.excuseChild}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
      </main>

      {/* see reactions */}
      <aside className={styles.reactionContainer}>
        <button
          className={styles.reactionButton}
          onClick={() => {
            alert("wop wop not working yet");
          }}
        >
          SEE REACTIONS...
        </button>
      </aside>
    </div>
  );
}
