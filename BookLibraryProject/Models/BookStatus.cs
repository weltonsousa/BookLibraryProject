using System.ComponentModel;

namespace BookLibraryProject.Models
{
    public enum BookStatus
    {
        [Description("Want to read")]
        WantToRead,
        
        [Description("Reading")]
        Reading,
        
        [Description("Read")]
        Read
    }
}   
