var sketchProc=function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(30);


//ProgramCodeGoesHere

//background 
background(0, 0, 0);

// By CUTHBERT
var rolCode = [  1 , 0 , 0 , 1 , 1 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 0 , 1 , 0 , 1 , 0 , 0 , 1 , 0 , 0 , 0 , 1 , 0 , 0 , 1 , 1 , 1 , 1 , 1 , 0 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 , 1 , 0 , 0 , 1 , 1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ];

var counter = 0;
var a = 0;
var commandreg = 0;
var memory = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var input = 28;

var INDICATOR_SIZE = 10;

var loadCode = function()
{
    var memidx = 0;
    var bitidx = 0;
    for (var i = 0; i < 16; i++)
    {
        var bit = 1<<6;
        memory[memidx] = 0;
        for (var b = 0; b < 7; b++)
        {
            if (rolCode[bitidx++]) {
                memory[memidx] |= bit;            
            }
            bit >>=1;
        }
        memidx++;
    }
};

var instructionDecodeExecute = function(value)
{   commandreg = value;
    var instruction = (value & 112) >> 4;
    var operand = (value & 15);
    counter++;
    switch (instruction)
    {
		case 0:
			a = 0;
			break;

		case 1:
			a = a + memory[operand] & 127;
            break;

		case 2:
			a = a - memory[operand] & 127;
			break;

		case 3:
			memory[operand] = a;
			break;

		case 4:
			// input value
			memory[operand] = input;
			break;

		case 5:
			counter = operand;
			break;

		case 6:
			if (!(a & 64)) { 
                counter = operand;
            }
			break;

		case 7:
			// stop the program
			break;
			
		default:
			break;
	}
    
    counter = counter & 15;
};


var displayUI = function(xpos, ypos)
{
	var displayWord = function(xl, yl, word)
	{
		var bit = 1<<6;
		for (var x = 0; x < 7; x++)
		{
			stroke(112, 117, 53);
			var bOn = word & bit;
			if (bOn)
			{// black
				// draw bit
				fill (250, 184, 18);
			}
			else
			{// bg color
				fill (5, 5, 5);
			}
			ellipse(xl + x * (INDICATOR_SIZE+2), yl, INDICATOR_SIZE, INDICATOR_SIZE);
            
            bit >>= 1;
		}
	};
    
    //
    var mx = xpos, my = ypos;
    textSize(16);
    fill(57, 107, 245);
    text("MEMORY", mx, my);
     my += 18;
    for (var ri = 0; ri < memory.length; ri++)
    {
        displayWord(mx, my, memory[ri] );
        my += (INDICATOR_SIZE+4);
    }

    textSize(11);
 
    mx = xpos + (INDICATOR_SIZE * 15);
    my = ypos;

    fill(57, 107, 245);
    text("COUNTER", mx+10, my);
    my += 11;
    displayWord(mx,my, counter);
    my += (INDICATOR_SIZE*3);
    fill(57, 107, 245);
    text("ACCUMULATOR", mx-3, my);
    my += (INDICATOR_SIZE * 1);
    displayWord(mx,my, a);
    my += (INDICATOR_SIZE*3);
    fill(57, 107, 245);
    text("COMMAND REG", mx-3, my);
    my += (INDICATOR_SIZE * 1);
    displayWord(mx,my, commandreg);

};

loadCode();

var draw = function() {
    instructionDecodeExecute(memory[counter]);
    displayUI(40,40);
};


}};