var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
  try
  {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == undefined)
      throw Error("A command must be specified");
      
    var result = {};
    if (query['cmd'] == 'calcDistance')
    {
      result = calcDistance(query);
    }
    else if (query['cmd'] == 'calcCost')
    {
      result = calcCost(query);
    }   
    else
    {
      throw Error("Invalid command: " + query['cmd']);
    }
 
    res.write(JSON.stringify(result));
    res.end('');
  }
  catch (e)
  {
    var error = {'error' : e.message};
    res.write(JSON.stringify(error));
    res.end('');
  }
}

function calcDistance(query)
{
  if (query['budget'] == undefined)  
    throw Error("Expecting a number in budget");
    
  if (query['mpg'] == undefined)  
    throw Error("Expecting a number in mpg");
    
  if (query['fuelCost'] == undefined)  
    throw Error("Expecting a number in fuelCost");
    
   if(isNaN(query['budget']) || isNaN(query['mpg']) || isNaN(query['fuelCost']))
      {
        throw Error('Variable must be a number');
      }


  if(query['budget'] > 0 && query['mpg'] > 0)
  {
    var total = query['budget'] * query['mpg'];
  }
  else
  {
    throw Error('Variable must be greater than zero');
  }
  
  if(query['fuelCost'] > 0)
  {
    var d = total / query['fuelCost'];
  }

    
  var result = {'distance' : d}; 
  return result;
}

function calcCost(query)
{
  if (query['distance'] == undefined)  
    throw Error("Expecting a number in distance");
    
  if (query['mpg'] == undefined)  
    throw Error("Expecting a number in mpg");
    
  if (query['fuelCost'] == undefined)  
    throw Error("Expecting a number in fuelCost");
    
   if(isNaN(query['distance']) || isNaN(query['mpg']) || isNaN(query['fuelCost']))
      {
        throw Error('Variable must be a number');
      }


  if(query['distance'] > 0 && query['fuelCost'] > 0)
  {
    var total = query['distance'] * query['fuelCost'];
  }
  else
  {
    throw Error('Variable must be greater than zero');
  }
  
  if(query['fuelCost'] > 0)
  {
    var b = total / query['mpg'];
  }

    
  var result = {'budget' : b}; 
  return result;
}