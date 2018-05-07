get(user,start,limit)
 new date,increment,numberOfDocuments,results,document,exit

 set start=$get(start)
 set limit=$get(limit)
 set exit=0
 set results=$name(^CacheTemp($J))
 set document=start
 set numberOfDocuments=-1

 for  set document=$order(^MindWave(user,document)) quit:document=""  quit:exit  do
 . if document="count" quit
 . ;
 . set increment=$increment(numberOfDocuments)
 . ;
 . ; we have returned enough documents, don't continue the loop
 . if ((limit'=0)&(numberOfDocuments'<(limit-1))) do
 . . set exit=1
 . . quit
 . ;
 . ; return the document
 . merge @results@("Mindwave")=^MindWave(user,document)

 set @results@("Mindwave","metadata","TotalItems")=$get(^MindWave(user,"count"))
 set @results@("Mindwave","metadata","Items")=$g(numberOfDocuments)+1
 set @results@("Mindwave","metadata","ItemsRemaining")=$get(^MindWave(user,"count"))-($g(numberOfDocuments)+1+start)
 quit results
