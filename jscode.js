<script type="text/javascript">

ExecuteOrDelayUntilScriptLoaded(runCode, "sp.js");

var itemId = 2;
var targetListItem;

function runCode() {
    var clientContext = new SP.ClientContext();
    var targetList = clientContext.get_web().get_lists().getByTitle('SCHOOL');
    targetListItem = targetList.getItemById(itemId);
    //clientContext.load(targetListItem, 'Include(Title)');
	clientContext.load(targetListItem, 'Title');
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
}

function onQuerySucceeded() {

    //alert('Request succeeded. \n\nRetrieved Item is: ' + targetListItem.get_item('Title'));
	document.getElementById('tdEC').innerHTML=targetListItem.get_item('Title');

}

function onQueryFailed(sender, args) {
    alert('Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
}

</script>

<table>
<tr>
<td>Welcome to the Page</td>
</tr>
<tr>
<td id='tdEC'>Not loaded
</td>
</tr>
</table>

