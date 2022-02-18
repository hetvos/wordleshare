/*
Wordle 242 6/6

⬛🟩⬛🟩⬛
⬛🟩🟨⬛⬛
⬛🟩⬛🟩⬛
⬛🟩⬛🟩⬛
🟩⬛⬛🟨⬛
🟩🟩🟩🟩🟩
*/

var results = document.getElementById("results")

function getResults(){
var result= results.value.split("\n\n")
resulthead = result[0]
result = result[1].split("\n")
parsedResult = []
result.forEach((res)=>{parsedResult.push(res.replaceAll("⬛","N").replaceAll("⬜","N").replaceAll("🟩","Y").replaceAll("🟧","Y").replaceAll("🟨","W").replaceAll("🟦","W").split(""))})
drawCanvas([resulthead,parsedResult])
}

themes = {
	"dark": {
		"BG": "#0d0d0d",
		"TX": "#eee",
		 "N": "#292b29"
	},
	"light": {
		"BG": "#eee",
		"TX": "#0d0d0d",
		 "N": "#bdc4c7"
	}
}

colors = {
	"normal": {
		"Y": "#32a852",
		"W": "#de9228"
	},
	"colorblind": {
		"Y": "#e3792d",
		"W": "#49b3d6"
	}
}

var lightTheme = document.getElementById("light")
var colorblindMode = document.getElementById("colorblind")

function drawCanvas(results){
	if(lightTheme.checked) { theme = "light" } else { theme = "dark" }
	if(colorblindMode.checked) { color = "colorblind" } else { color = "normal" }
	map = {...themes[theme],...colors[color]}
	var canvas = document.getElementById("resultcanvas")	
	var ctx = canvas.getContext("2d")
	height = 22+48*results[0].split(" ")[2][0]
	canvas.height=height
	ctx.clearRect(-1,-1,69420,69420)
	ctx.fillStyle=map["BG"]
	ctx.fillRect(-1,-1,69420,69420)
	ctx.font = "16px Montserrat"
	ctx.fillStyle=map["TX"]
	ctx.fillText(results[0], 4, 16.5); 
	words = results[1]
	o = 0
	words.forEach((word)=>{
		i = 0
		word.forEach((char)=>{
			ctx.fillStyle = map[char]
			ctx.fillRect(4+48*i, 22+48*o, 44, 44);
			i+=1
		})
		o+=1
	})
	document.getElementById("resultimg").src=canvas.toDataURL()
}

results.onkeyup=getResults
lightTheme.onchange=getResults
colorblindMode.onchange=getResults
