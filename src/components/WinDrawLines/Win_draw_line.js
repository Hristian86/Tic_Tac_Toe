export const horisontal_line = (i) => {
    document.getElementById("row" + i).style.backgroundImage = "url('https://anthroprospective.com/wp-content/uploads/2018/10/Horizontal-Line-Transparent-Background.png')";
    document.getElementById("row" + i).style.backgroundPosition = "center"
}

export const vertical_line = (j) => {
    // To do change the image too vertical.
    console.log("col" + j + j);

    for (var i = 0; i < 3; i++) {

        document.getElementById("col" + i + j).style.backgroundImage = "url('https://lh3.googleusercontent.com/proxy/yDpIL8omyX1R6OXEFbD08gAx2zy4oPw_kVNdvs-MeCS7VS62mHxhXDvTDVF8rtbyBPFdS1qrKyfKDnFgZ74lHHBfndEoNdHi-XTFAZXwb0FL4cylNYXyKXcHPp6C8-EoWg')";

        document.getElementById("col" + i + j).style.backgroundPosition = "center"

    }
}

export const left_diagonal_line = () => {

    for (var i = 0; i < 3; i++) {
        document.getElementById("col" + i + i).style.backgroundPosition = "center"

        document.getElementById("col" + i + i).style.backgroundImage = "url('images/left.png')";

    }
}

export const right_diagonal_line = () => {

    for (var i = 0; i < 3; i++) {
        document.getElementById("col" + i + i).style.backgroundPosition = "center"

        document.getElementById("col" + (3 - i - 1) + i).style.backgroundImage = "url('/images/output-onlinepngtools.png')";



        //document.getElementById("col" + i + i).style.transform = "rotate(90deg)"
    }
}