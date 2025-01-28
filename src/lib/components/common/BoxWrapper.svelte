<div class="container">
    <div class="flex flex-col shape-wrapper m-auto gap-2">
        <slot></slot>
    </div>
</div>


<style>
    .container {
        max-width: 250px;
    }

    .shape-wrapper {
        width: 210px;
        padding: 100px 30px 25px 30px;
        position: relative;
        box-sizing: border-box;
    }

    .shape-wrapper::before {
        /* Fixed curved hat */
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100px; /* Fixed height for the hat */
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cpath fill='none' stroke='black' stroke-width='2' d='M0,100 C60,80 90,50 100,30 L100,30 C110,50 140,80 200,100'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        pointer-events: none;
    }

    .shape-wrapper::after {
        /* Flexible height box */
        content: "";
        position: absolute;
        top: 100px; /* Align with bottom of hat */
        left: 0;
        width: 100%;
        border: 3px solid black;
        border-top: 0;
        height: calc(100% - 100px); /* Subtract hat height */
        background-repeat: no-repeat;
        background-size: 100% 100%;
        pointer-events: none;
    }
</style>