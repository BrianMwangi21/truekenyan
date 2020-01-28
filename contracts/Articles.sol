pragma solidity >=0.4.21 <0.7.0;

contract Articles {
    // Save the owner address
    address admin;

    // Create struct for articles
    struct Article {
        uint id;
        address authorAdd;
        string authorName;
        string articleTitle;
        string articleContent;
        string dateCreated;
    }

    // Create mapping for articles
    mapping( uint => Article ) public articles;
    // Create mapping for authors and article count
    mapping( address => uint) authorArticleCount;
    // Variable to keep count of articles
    uint public articlesCount;

    // Constructor
    constructor() public {
        // The constructor calls private function to create genesis article
        // Also saves the admin address
        admin = msg.sender;
        _createGenesisArticle();
    }

    // Private function to create genesis article
    function _createGenesisArticle() private {
        articlesCount++;
        Article memory genesis = Article(
            articlesCount,
            msg.sender,
            "One",
            "...What's next ?",
            "...forming a record that cannot be changed without redoing the proof-of-work. The longest chain not only serves as proof...",
            "In the beggining"
        );

        // Add the genesis article to mapping
        articles[articlesCount] = genesis;

        // Add count of articles for address
        authorArticleCount[msg.sender]++;
    }
}